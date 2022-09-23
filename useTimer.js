import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import useAppState from "./useAppState";


import Snoopy from 'rn-snoopy';
import bars from 'rn-snoopy/stream/bars';
import filter from 'rn-snoopy/stream/filter';
import buffer from 'rn-snoopy/stream/buffer';

import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
const emitter = new EventEmitter();

const events = Snoopy.stream(emitter);


filter({ method:'createView' }, true)(events).subscribe()

// Visualize the rate of messages per second which go over the MessageQueue:
bars()(
    buffer()(
      events
    )
  ).subscribe()
  
  // Visualize how big are messages over the MessageQueue:
  // Note: we turn messages into a JSON string, and then measure
  // the length of that string. Previously, the bars method had
  // no argument, and here it gets a "measurement" function.
  bars(info=>JSON.stringify(info.args).length)(
    events
  ).subscribe()
filter({ type: Snoopy.TO_NATIVE }, true)(events).subscribe()


export const useTimer = () => {
    const [time, setTime] = useState(0);
    const [timeBefore, setTimeBefore] = useState(0);
    const timeout = useRef();
    const [status, setStatus] = useState("pause");


    useAppState({
        onBackground: () => {
            setTimeBefore(moment.now())
        },
        onForeground: () => {
            const now = moment.now();
            const then = timeBefore ? timeBefore : now;

            if (status === "play") {
                setTime(value => value + diffTime(then, now));
            }
        }
    })

    const diffTime = (then, now) => {
        const ms = moment(now).diff(moment(then));
        const duration = moment.duration(ms);
        const seconds = Math.floor(duration.asSeconds());

        return seconds;
    };

    useEffect(() => {
        timeout.current = setInterval(() => {
            if (status === "play") {
                setTime(lastTime => lastTime + 1);
            }
        }, 1000);
        return () => {
            clearInterval(timeout.current);
        }
    }, [time, status]);

    const minutes = Math.floor(time / 60);
    const seconds = String(time % 60).padStart(2, "0");

    const pause = () => {
        setStatus("pause");
        clearInterval(timeout.current);
    }
    
    const play = () => {
        setStatus("play");
    }

    const stop = () => {
        setStatus("stop");
    }

    return { minutes, seconds, pause, play, stop }
}
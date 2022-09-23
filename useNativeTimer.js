import Snoopy from 'rn-snoopy';
import bars from 'rn-snoopy/stream/bars';
import filter from 'rn-snoopy/stream/filter';
import buffer from 'rn-snoopy/stream/buffer';

import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import { Timer } from "./MyViewManager";
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
    const pause = () => {
        Timer.pause();
    }
    
    const play = () => {
        Timer.play();
    }

    const stop = () => {
        Timer.stop();
    }

    return { pause, play, stop }
}
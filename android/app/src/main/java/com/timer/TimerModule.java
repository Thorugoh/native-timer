package com.timer;

import android.app.Activity;
import android.os.SystemClock;
import android.util.Log;
import android.widget.Chronometer;
import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class TimerModule extends ReactContextBaseJavaModule {

    private Chronometer chronometer;
    private long pauseOffset;
    private boolean running;

    public TimerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "Timer";
    }

    @ReactMethod
    public void play(){
        Log.i("timer", "play");
        final Activity activity = getCurrentActivity();

        if (activity != null) {
            chronometer = activity.findViewById(R.id.chronometer);
            chronometer.setBase(SystemClock.elapsedRealtime());

            if (!running) {
                chronometer.setBase(SystemClock.elapsedRealtime() - pauseOffset);
                chronometer.start();
                running = true;
            }
            return;
        }
    }

    @ReactMethod
    public void pause() {
        Log.i("timer", "pause");
        if (running) {
            chronometer.stop();
            pauseOffset = SystemClock.elapsedRealtime() - chronometer.getBase();
            running = false;
        }
    }

    @ReactMethod
    public void stop(){
        Log.i("timer", "stop");
        chronometer.setBase(SystemClock.elapsedRealtime());
        pauseOffset = 0;
    }

}

package com.timer;

import android.content.Context;
import android.graphics.Color;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;

public class CustomView extends FrameLayout {
    public CustomView(@NonNull Context context) {
        super(context);
        // set padding and background color
        this.setPadding(16,16,16,16);
        this.setBackgroundColor(Color.parseColor("#5FD3F3"));

        // add default text view
        TextView text = new TextView(context);
        text.setText("0");
        this.addView(text);
    }
}
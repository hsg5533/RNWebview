package com.rnwebview

import android.view.WindowManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class KeyboardModeModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "KeyboardMode"

    @ReactMethod
    fun setAdjustNothing() {
        val activity = currentActivity ?: return
        activity.runOnUiThread {
            activity.window.setSoftInputMode(
                WindowManager.LayoutParams.SOFT_INPUT_ADJUST_NOTHING
            )
        }
    }

    @ReactMethod
    fun setAdjustResize() {
        val activity = currentActivity ?: return
        activity.runOnUiThread {
            activity.window.setSoftInputMode(
                WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE
            )
        }
    }

    @ReactMethod
    fun setAdjustPan() {
        val activity = currentActivity ?: return
        activity.runOnUiThread {
            activity.window.setSoftInputMode(
                WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN
            )
        }
    }
}

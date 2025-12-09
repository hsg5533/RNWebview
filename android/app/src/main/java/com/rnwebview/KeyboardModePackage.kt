package com.rnwebview

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.ViewManager

class KeyboardModePackage : ReactPackage {
  override fun createNativeModules(reactContext: ReactApplicationContext)
    = listOf(KeyboardModeModule(reactContext))

  override fun createViewManagers(reactContext: ReactApplicationContext)
    = emptyList<ViewManager<*, *>>()
}

package com.yetu.controlcenter

import play.api.GlobalSettings

// Global object as referenced in reference.conf
object Global extends Global

// settings to use in the application. Can be overridden for tests in test/FakeGlobal
trait Global extends GlobalSettings with com.yetu.play.authenticator.Global {

}
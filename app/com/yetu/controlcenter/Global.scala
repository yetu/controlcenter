package com.yetu.controlcenter

import com.yetu.common.YetuCommonGlobalSettings
import com.yetu.play.authenticator.AuthenticatorGlobal

// Global object as referenced in reference.conf
object Global extends Global

// settings to use in the application. Can be overridden for tests in test/FakeGlobal
trait Global extends YetuCommonGlobalSettings with AuthenticatorGlobal {
}

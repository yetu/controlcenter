package com.yetu.controlcenter.utils

import com.typesafe.config.ConfigFactory
import play.api.Play
import play.api.Play.current
import com.yetu.typesafeconfigextentension.ConfigExtension

object ConfigLoader extends ConfigExtension {
  val config = ConfigFactory.load().substitutePropertyValues("application.environmentUrl")

  lazy val householdServicesHost = config.getString("householdServicesHost")

  lazy val frontendConfig = config.getConfig("frontend")
}

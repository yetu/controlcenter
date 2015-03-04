package com.yetu.controlcenter.utils

import com.typesafe.config.ConfigFactory

object ConfigLoader {

  private val config = ConfigFactory.load()

  val householdServicesHost = WSUtils.addTrailingSlash(config.getString("householdServicesHost"))

}
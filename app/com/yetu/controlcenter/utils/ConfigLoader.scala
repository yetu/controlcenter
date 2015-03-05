package com.yetu.controlcenter.utils

import play.api.Play
import play.api.Play.current


object ConfigLoader {

    val householdServicesHost = Play.configuration.getString("householdServicesHost").get

}

package com.yetu.controlcenter.models

import play.api.libs.json.Json

case class HealthObject(status: String = "alive")

object HealthObject {
  implicit val format = Json.format[HealthObject]
}
package com.yetu.controlcenter.controllers

import com.yetu.controlcenter.models.HealthObject
import play.api.libs.json.{JsValue, Json, JsString, JsObject}
import play.api.mvc.{Action, Controller}

object Health extends Controller {

  def check = Action {
    //TODO: publish buildinfo plugin and fix the commented out line
    // include in plugins.sbt
    //    Ok(com.yetu.BuildInfo.toJson)

    Ok(Json.toJson(new HealthObject("alive")))
  }




}


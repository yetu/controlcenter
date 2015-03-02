package com.yetu.controlcenter.controllers

import play.api.mvc.{Action, Controller}

object Health extends Controller {

  def check = Action {
    Ok(com.yetu.BuildInfo.toJson)
  }




}


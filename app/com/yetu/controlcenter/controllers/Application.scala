package com.yetu.controlcenter.controllers

import com.yetu.controlcenter.views

import play.api.mvc.{Action, Controller}

object Application extends Controller {
	def entryPoint = Action {
		implicit request => {
			Ok(views.html.index())
		}
	}
}

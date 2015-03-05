package com.yetu.controlcenter.it

import play.api.mvc.{Action, Controller}

object HouseholdRemoteAPIController extends Controller {

    def get = Action {
        Ok("someValue")
    }

    def delete = Action {
        NoContent
    }

    def post = Action { implicit request =>
        Accepted(request.body.asJson.get)
    }
}

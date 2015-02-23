package com.yetu.controlcenter.routes

import com.yetu.controlcenter.base.BaseRoutesSpec
import play.api.test.FakeRequest
import play.api.test.Helpers._

class HealthCheckSpec extends BaseRoutesSpec {

	val healthUrl = "/health"

  "health controller" must {

    "return name and organization " in {
      val Some(result) = route(FakeRequest(GET, healthUrl))
      status(result) mustEqual (OK)
      contentAsString(result) must include("alive")
    }
  }
}

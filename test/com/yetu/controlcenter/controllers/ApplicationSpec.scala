package com.yetu.controlcenter.controllers

import com.yetu.controlcenter.base.BaseRoutesSpec
import play.api.test.FakeRequest
import play.api.test.Helpers._


class ApplicationSpec extends BaseRoutesSpec {
    val indexUrl = "/"
    val profile = "/profile"
    val household = "/household"


    s"non-authenticated GET request on $indexUrl" must {
        "return a 303 response" in {
            val Some(response) = route(FakeRequest(GET, indexUrl))
            status(response) mustEqual (SEE_OTHER)
        }

    }

    s"authenticated GET request on $indexUrl" must {
        "return a valid 200 response" in {
            val response = getRequestAuthenticated(indexUrl)
            status(response) mustEqual (OK)
            contentAsString(response) must include("Control Center")
        }
    }

    s"GET request on $profile" must {
        "return a 500 as there are no access tokens" in {
            val response = getRequestAuthenticated(profile)
            status(response) mustEqual (INTERNAL_SERVER_ERROR)
        }
    }

    s"GET request on $household" must {
        "return a 500 as there are no access tokens" in {
            val response = getRequestAuthenticated(household)
            status(response) mustEqual (INTERNAL_SERVER_ERROR)
        }
    }

}

package com.yetu.controlcenter.it

import com.yetu.controlcenter.base.{ BaseRoutesSpec, FakeGlobal }
import org.scalatestplus.play.OneServerPerSuite
import play.api.libs.json.{ JsValue, Json }
import play.api.libs.ws.WS
import play.api.test.FakeApplication
import play.api.test.Helpers._

class HouseholdAPIProxySpec extends BaseRoutesSpec with OneServerPerSuite {

  val localUrl = s"http://localhost:$port"
  val householdRemoteEndpoint = "/remoteHouseholdApi"
  val householdRemoteEndpointGateway = s"$householdRemoteEndpoint/gateway"
  val householdRemoteURL = s"$localUrl${householdRemoteEndpoint}"

  val sampleJson: JsValue = Json.parse("""
                                                {
                                                  "user": {
                                                    "name" : "Jane",
                                                    "age" : 25

                                                  }
                                                }
                                          """)

  implicit override lazy val app: FakeApplication =
    FakeApplication(withGlobal = Some(new FakeGlobal),
      additionalConfiguration = Map("householdServicesHost" -> householdRemoteURL),
      withRoutes = {
        case ("GET", householdRemoteEndpoint)           => HouseholdRemoteAPIController.get
        case ("POST", householdRemoteEndpoint)          => HouseholdRemoteAPIController.post
        case ("DELETE", householdRemoteEndpointGateway) => HouseholdRemoteAPIController.delete
      }
    )

  "The OneAppPerSuite trait" must {
    "load configuration correctly" in {
      app.configuration.getString("householdServicesHost") mustBe Some(householdRemoteURL)
    }
  }

  s"${householdRemoteEndpoint} which created by Fake Application" must {
    "return a 200 to ensure endpoint is working" in {
      val response = await(WS.url(householdRemoteURL).get())
      response.status mustEqual (OK)
      response.body must include("someValue")
    }
  }

  s"GET request on household" must {
    "return a 200 and some value" in {
      val response = getRequestAuthenticated("/household")
      status(response) mustEqual (OK)
      contentAsString(response) must include("someValue")
    }
  }

  s"POST request on household" must {
    "return a 202 and posted json data" in {
      val response = postRequestAuthenticated("/household", parameters = sampleJson)
      status(response) mustEqual (ACCEPTED)
      contentAsJson(response) mustEqual sampleJson
    }
  }

  s"DELETE request on household/gateway" must {
    "return a 204 correctly to test path relations are working" in {
      val response = getRequestAuthenticated("/household/gateway", method = DELETE)
      status(response) mustEqual (NO_CONTENT)
    }
  }

}


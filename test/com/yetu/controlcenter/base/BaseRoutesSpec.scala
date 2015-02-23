package com.yetu.controlcenter.base

import com.mohiva.play.silhouette.api.Logger
import com.mohiva.play.silhouette.impl.authenticators.SessionAuthenticator
import org.scalatest.concurrent.{AsyncAssertions, ScalaFutures}
import org.scalatest.mock.MockitoSugar
import org.scalatestplus.play.{OneAppPerSuite, PlaySpec}
import play.api.libs.json.{JsNull, JsValue}
import play.api.mvc.{AnyContentAsEmpty, Result}
import play.api.test.Helpers._
import play.api.test.{FakeApplication, FakeHeaders, FakeRequest}

import scala.concurrent.Future

class BaseRoutesSpec extends PlaySpec with ScalaFutures with AsyncAssertions with OneAppPerSuite with Logger with TestData with MockitoSugar {

	// this import is required for the .withAuthenticator[]()()
	import com.mohiva.play.silhouette.test.FakeRequestWithAuthenticator

  def getRequestAuthenticated(url: String, headers: FakeHeaders = FakeHeaders()): Future[Result] = {

    route(FakeRequest(GET, url, headers, AnyContentAsEmpty).withAuthenticator[SessionAuthenticator](FakeGlobal.identity.loginInfo)(FakeGlobal.env)
    ) match {
      case Some(response) =>
        logger.debug(s"content $url: ${contentAsString(response)}")
        logger.debug(s"status $url: ${status(response)}")
        redirectLocation(response).map {
          location => logger.debug(s"redirectLocation of $url: $location")
        }

        response
      case None => throw new Exception(s"The url '$url' is not valid.")
    }
  }

  def postRequestAuthenticated(url: String, parameters: JsValue = JsNull, fakeHeaders: FakeHeaders = FakeHeaders()): Future[Result] = {
    route(FakeRequest(POST, url, fakeHeaders, parameters)
      .withAuthenticator[SessionAuthenticator](FakeGlobal.identity.loginInfo)(FakeGlobal.env)) match {
      case Some(response) =>
        logger.debug(s"response: ${contentAsString(response)}")
        logger.debug(s"response status: ${status(response)}")
        logger.debug(s"response location: ${header("Location", response)}")
        logger.debug(s"response headers: ${headers(response)}")
        response
      case None => throw new Exception(s"The url '$url' is not valid.")
    }
  }

  //for all tests, use the FakeGlobal with Authentication mocked out.
  implicit override lazy val app: FakeApplication =
    FakeApplication(withGlobal = Some(new FakeGlobal))


}

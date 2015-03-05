package com.yetu.controlcenter.base

import com.mohiva.play.silhouette.api.Logger
import org.scalatest.concurrent.{ AsyncAssertions, ScalaFutures }
import org.scalatest.mock.MockitoSugar
import org.scalatestplus.play.PlaySpec

class BaseSpec extends PlaySpec with ScalaFutures with AsyncAssertions with Logger with TestData with MockitoSugar {

}

package com.yetu.controlcenter.utils

import com.yetu.controlcenter.base.BaseSpec
import play.api.test.FakeRequest
import play.api.test.Helpers._


class WSUtilsSpec extends BaseSpec{

  "WSUtils" must {
    val urlWithTrailingSlash = "http://example.com/"
    val urlWithOutTrailingSlash = "http://example.com"


    "add trailing slash if exist" in {
      val result = WSUtils.addTrailingSlash(urlWithTrailingSlash)
      result mustEqual urlWithTrailingSlash
    }

    "not add trailing slash if exist" in {
      val result = WSUtils.addTrailingSlash(urlWithOutTrailingSlash)
      result mustEqual urlWithTrailingSlash
    }


    "remove trailing slash if exist" in {
      val result = WSUtils.removeTrailingSlash(urlWithTrailingSlash)
      result mustEqual urlWithOutTrailingSlash
    }

    "should not remove any char if does not exist" in {
      val result = WSUtils.removeTrailingSlash(urlWithOutTrailingSlash)
      result mustEqual urlWithOutTrailingSlash

      WSUtils.removeTrailingSlash("") mustEqual ""
    }

  }
}

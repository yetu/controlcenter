package com.yetu.controlcenter.utils

import com.yetu.controlcenter.base.BaseSpec

class WSUtilsSpec extends BaseSpec {

  val urlWithTrailingSlash = "http://example.com/"
  val urlWithOutTrailingSlash = "http://example.com"
  val pathWithLeadingSlash = "/url/to/some/path"
  val pathWithOutLeadingSlash = "url/to/some/path"

  "WSUtils" must {

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

    "should add leading slash if does not exist" in {
      val result = WSUtils.addLeadingSlash(pathWithOutLeadingSlash)
      result mustEqual pathWithLeadingSlash

      WSUtils.addLeadingSlash("") mustEqual ""
    }

    "should not add leading slash if exist exist" in {
      val result = WSUtils.addLeadingSlash(pathWithLeadingSlash)
      result mustEqual pathWithLeadingSlash
    }

  }
}

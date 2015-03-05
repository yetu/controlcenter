package com.yetu.controlcenter.utils

import play.api.libs.ws.WSRequestHolder
import play.api.mvc.Result
import play.api.mvc.Results.Status

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

object WSUtils {


  /**
   * * Creates and return Authorization Header to be used in WSRequestHolder
   * @param accessToken
   * @return
   */
  def authorizationHeader (accessToken:String): (String, String) = {
    ("Authorization", s"Bearer $accessToken")
  }

  /**
   * * Creates and return Authorization Query String to be used in WSRequestHolder
   * @param accessToken
   * @return
   */
  def authorizationQueryString (accessToken:String): (String, String) = {
    ("access_token", accessToken)
  }

  /**
   * * Adds trailing slash to the url if it does not exist
   * @param url
   * @return
   */
  def addTrailingSlash (url:String): String = {
    if(url.endsWith("/")){
      url
    }else{
      s"$url/"
    }
  }

    /**
     * * Adds leading slash to the url if it does not exist
     * @param url
     * @return
     */
    def addLeadingSlash (url:String): String = {
        if(url.length == 0 || url.startsWith("/") ){
            url
        }else{
            s"/$url"
        }
    }

  /**
   * * Removes trailing slash from url if exist
   * @param url
   * @return
   */
  def removeTrailingSlash (url:String): String = {
    if(!url.endsWith("/")){
      url
    }else{
      url.dropRight(1)
    }
  }


  /**
   * * Wraps the incoming response from webservice and serve as it is
   * @param ws
   * @return
   */
  def wrapResponse(ws:WSRequestHolder, method:String = "GET" ): Future[Result] = {
    ws.execute(method).map { response =>
      new Status(response.status)(response.body)
    }
  }
}

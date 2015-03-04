package com.yetu.controlcenter.controllers


import javax.inject.Inject

import com.mohiva.play.silhouette.api.{Environment, Silhouette}
import com.mohiva.play.silhouette.impl.authenticators.SessionAuthenticator
import com.yetu.controlcenter.views
import com.yetu.play.authenticator.models.User
import com.yetu.play.authenticator.models.daos.OAuth2InfoDAO
import com.yetu.play.authenticator.utils.di.ConfigLoader
import play.api.Play.current
import play.api.libs.ws.WS

import scala.concurrent.ExecutionContext.Implicits.global


/**
 * The ControlCenter application controller
 *
 * @param env The Silhouette environment.
 */
class Application @Inject()(implicit val env: Environment[User, SessionAuthenticator], oauth2Dao: OAuth2InfoDAO)
  extends Silhouette[User, SessionAuthenticator] {

  def entryPoint = SecuredAction {
    implicit request => {
      Ok(views.html.index())
    }
  }


  /**
   * * Method returns incoming data from http request as it is whether succesful or not.
   * * Client-side should handle the incoming data properly
   * @return play.api.mvc.Result
   */
  def profile = SecuredAction.async { implicit request =>
    for {
      info <- oauth2Dao.find(request.identity.loginInfo)
      accessToken: String = info.map(_.accessToken).getOrElse("Invalid access token")
      wsResponse <- WS.url(ConfigLoader.AuthServer.profileUrl).withQueryString(("access_token", accessToken)).get
    } yield new Status(wsResponse.status)(wsResponse.body)
  }


}

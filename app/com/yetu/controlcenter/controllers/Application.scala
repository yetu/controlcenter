package com.yetu.controlcenter.controllers


import com.yetu.controlcenter.views
import javax.inject.Inject
import com.mohiva.play.silhouette.api.{Environment, Silhouette}
import com.mohiva.play.silhouette.impl.authenticators.SessionAuthenticator
import com.yetu.play.authenticator.models.User
import com.yetu.play.authenticator.models.daos.OAuth2InfoDAO


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

}

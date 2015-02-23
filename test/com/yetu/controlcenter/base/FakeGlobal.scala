package com.yetu.controlcenter.base

import java.util.UUID

import com.google.inject.util.Modules
import com.google.inject.{AbstractModule, Guice}
import com.mohiva.play.silhouette.api.{Environment, LoginInfo}
import com.mohiva.play.silhouette.impl.authenticators.SessionAuthenticator
import com.mohiva.play.silhouette.test.FakeEnvironment
import com.yetu.controlcenter.Global
import com.yetu.play.authenticator.models.User
import com.yetu.play.authenticator.utils.di.SilhouetteModule
import net.codingwell.scalaguice.ScalaModule

import FakeGlobal.env

/**
 * Provides a fake global to override the Guice injector.
 */
class FakeGlobal extends Global {

	/**
	 * Overrides the Guice injector.
	 */
	override val injector = Guice.createInjector(Modules.`override`(new SilhouetteModule).`with`(new FakeModule))

	/**
	 * A fake Guice module.
	 */
	class FakeModule extends AbstractModule with ScalaModule {
		def configure() = {
			bind[Environment[User, SessionAuthenticator]].toInstance(env)
		}
	}

}

object FakeGlobal {


	/**
	 * An identity.
	 */
	val identity = User(
		userUUID = UUID.randomUUID(),
		loginInfo = LoginInfo("provider", "user@user.com"),
		firstName = None,
		lastName = None,
		fullName = None,
		email = None,
		avatarURL = None
	)

	/**
	 * A Silhouette fake environment.
	 */
	implicit val env = FakeEnvironment[User, SessionAuthenticator](Seq(identity.loginInfo -> identity))


}

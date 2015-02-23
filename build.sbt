name := """controlcenter"""

version := "1.0.0"

organization := "com.yetu"

scalaVersion := "2.11.5"

resolvers += Resolver.bintrayRepo("yetu", "maven")

pipelineStages := Seq(digest)

lazy val root = (project in file(".")).enablePlugins(PlayScala, SbtWeb)

libraryDependencies ++= Seq(
  "com.yetu" %% "yetu-play-authenticator" % "0.1.4",
  cache,
  ws,
  filters
)

// test libraries
libraryDependencies ++= Seq(
  "com.mohiva" %% "play-silhouette-testkit" % "2.0-RC1" % "test",
  "org.scalatest" %% "scalatest" % "2.2.1" % "test",
  "org.scalatestplus"  %% "play"  % "1.2.0" % "test"
)

scalacOptions ++= Seq(
  "-deprecation", // Emit warning and location for usages of deprecated APIs.
  "-feature", // Emit warning and location for usages of features that should be imported explicitly.
  "-unchecked", // Enable additional warnings where generated code depends on assumptions.
  "-Xfatal-warnings", // Fail the compilation if there are any warnings.
  "-Xlint", // Enable recommended additional warnings.
  "-Ywarn-adapted-args", // Warn if an argument list is modified to match the receiver.
  "-Ywarn-dead-code", // Warn when dead code is identified.
  "-Ywarn-inaccessible", // Warn about inaccessible types in method signatures.
  "-Ywarn-nullary-override", // Warn when non-nullary overrides nullary, e.g. def foo() over def foo.
  "-Ywarn-numeric-widen", // Warn when numerics are widened.
  "-language:implicitConversions" //allow implicit convertions defined by implicit def convertAtoB(a:A):B type functions
)
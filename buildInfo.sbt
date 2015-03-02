import java.util.{Calendar, TimeZone}

import sbtbuildinfo.Plugin._
import sbt.Keys._

//
// Settings related to the sbt-buildinfo plugin
//-----------------------------------------------

buildInfoSettings

buildInfoPackage := organization.value

sourceGenerators in Compile <+= buildInfo

lazy val gitTag = Process("git tag --contains HEAD").lines.headOption.getOrElse("")

lazy val lastCommit = Process("git log --pretty=oneline  -1").lines.head

buildInfoKeys ++= Seq[BuildInfoKey](name, version, scalaVersion, sbtVersion, organization)

buildInfoKeys ++= Seq[BuildInfoKey](
  BuildInfoKey.action("tag") {
    gitTag
  },
  BuildInfoKey.action("status") {
    "alive"
  },
  BuildInfoKey.action("commit") {
    lastCommit
  },
  BuildInfoKey.action("buildTime") {
    String.format("%tFT%<tRZ", Calendar.getInstance(TimeZone.getTimeZone("Z")))
  }
)
import aether.Aether._
import aether.MavenCoordinates
import com.typesafe.sbt.SbtNativePackager._
import com.typesafe.sbt.packager.universal.Keys._
import sbt.Keys.{name, version, _}
import sbt._

version in ThisBuild := "1.0.0" + "-" + gitHeadCommitSha

//
// Settings related to publishing this project artifact to nexus during (during deployment)
//
// Note: this is used by yetu internally to package and later deploy the application
// If you wish to use it, you need to adapt the hardcoded nexus URLs
//-----------------------------------------------------------------------------------------

lazy val gitHeadCommitSha = Process(
  "git rev-parse --short=8 HEAD").lines.head

publish <<= (publish) dependsOn (publish in Universal)

publishLocal <<= (publishLocal) dependsOn (publishLocal in Universal)

crossPaths := false

aetherPublishBothSettings

aetherArtifact <<= (organization, name in Universal, version, packageZipTarball in Universal, makePom in Compile, packagedArtifacts in Universal) map {
  (organization, name, version, binary, pom, artifacts) =>
    val nameWithoutVersion = name.replace(s"-$version", "")
    createArtifact(artifacts, pom, MavenCoordinates(organization, nameWithoutVersion, version, None, "tgz"), binary
    )
}

publishMavenStyle := true

publishTo <<= version { (v: String) =>
  // Note: this is used by yetu internally to package and later deploy the application
  // If you wish to use it, you need to adapt the hardcoded nexus URLs
  val nexus = "http://nexus.yetudev.com:8081/nexus/"
  if (v.trim.endsWith("SNAPSHOT"))
    Some("snapshots" at nexus + "content/repositories/snapshots")
  else
    Some("releases"  at nexus + "content/repositories/releases")
}

credentials += Credentials(Path.userHome / ".ivy2" / ".credentials")

publishArtifact in Test := false

pomIncludeRepository := { _ => false  }
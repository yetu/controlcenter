platform = require 'platform'

Helpers =

  getSetupAppUrl: ->
    isOSX = ->
      userAgentString = navigator.userAgent
      environment = platform.parse userAgentString
      /OS X/.test environment.os.family

    if isOSX platform
      window.yetu.config.setupDownloadUrlMac
    else
      window.yetu.config.setupDownloadUrlWin

module.exports = Helpers



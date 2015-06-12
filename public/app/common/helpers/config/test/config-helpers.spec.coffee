ConfigHelpers = require '..'
mock = require './config-helpers.mock.coffee'

describe 'ConfigHelpers', ->

  describe 'getSetupAppUrl', ->

    config = null
    userAgent = null

    beforeEach ->
      # mock config
      config = window.yetu.config
      window.yetu.config = mock.config

    afterEach ->
      window.yetu.config = config
      do mock.restoreUserAgent

    it 'returns the url pointing to the Windows version of the setup app on Windows', ->
      mock.setUserAgent mock.UserAgentString.WINDOWS
      url = do ConfigHelpers.getSetupAppUrl
      expect(url).toEqual window.yetu.config.setupDownloadUrlWin

    it 'returns the url pointing to the OS X version of the setup app on OS X', ->
      mock.setUserAgent mock.UserAgentString.OSX
      url = do ConfigHelpers.getSetupAppUrl
      expect(url).toEqual window.yetu.config.setupDownloadUrlMac

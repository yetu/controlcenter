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
      userAgent = navigator.userAgent

    afterEach ->
      navigator.userAgent = userAgent
      window.yetu.config = config

    it 'returns the url pointing to the Windows version of the setup app on Windows', ->
      navigator.userAgent = mock.UserAgentString.WINDOWS
      url = do ConfigHelper.getSetupAppUrl
      expect(url).toEqual window.yetu.config.setupDownloadUrlWin

    it 'returns the url pointing to the OS X version of the setup app on OS X', ->
      navigator.userAgent = mock.UserAgentString.OSX
      url = do ConfigHelper.getSetupAppUrl
      expect(url).toEqual window.yetu.config.setupDownloadUrlMac

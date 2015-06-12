navigatorPropertyDescriptor = null

module.exports =

  config:
    setupDownloadUrlWin: 'win-url.exe'
    setupDownloadUrlMac: 'mac-url.dmg'

  setUserAgent: (string) ->
    navigatorPropertyDescriptor = Object.getOwnPropertyDescriptor window, 'navigator'
    Object.defineProperty window, 'navigator', value: { userAgent: string }

  restoreUserAgent: ->
    Object.defineProperty window, 'navigator', navigatorPropertyDescriptor

  UserAgentString:
    WINDOWS: 'Mozilla/5.0 (MSIE 10.0; Windows NT 6.1; Trident/5.0)'
    OSX: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.124 Safari/537.36'

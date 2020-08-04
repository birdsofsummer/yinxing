var phantomjs = require('phantomjs-prebuilt')
var webdriverio = require('webdriverio')

var path = require('path')
var childProcess = require('child_process')

test=async()=>{
    var wdOpts = { desiredCapabilities: { browserName: 'phantomjs' } }
     program = await phantomjs.run('--webdriver=4444')
     title =await webdriverio.remote(wdOpts) .init() .url('https://www.baidu.com') .getTitle()
     console.log(title)
     //program.kill()

}


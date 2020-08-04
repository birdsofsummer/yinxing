const {
    get_ua,
    parse_ua,
    check_ua,
}=require('./ua')


const FF_UA="Mozilla/5.0 (X11; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0"

const WX_UA="Mozilla/5.0 (Linux; Android 6.0; 1503-M02 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/37.0.0.0 Mobile MQQBrowser/6.2 TBS/036558 Safari/537.36 MicroMessenger/6.3.25.861 NetType/WIFI Language/zh_CN"



const test_get_ua=()=>{
   const r=get_ua(FF_UA)
   const  b=r.getBrowser()
    //{ name: 'Firefox', version: '72.0', major: '72' }
   const c=r.getCPU()
    //{ architecture: 'amd64' }
   const  d=r.getDevice()
    //{ vendor: undefined, model: undefined, type: undefined }
   const eg=r.getEngine()
    //{ name: 'Gecko', version: '72.0' }
   const os=r.getOS()
    //{ name: 'Linux', version: 'x86_64' }
   const r0=r.getResult()
   const r1={
      ua: 'Mozilla/5.0 (X11; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0',
      browser: { name: 'Firefox', version: '72.0', major: '72' },
      engine: { name: 'Gecko', version: '72.0' },
      os: { name: 'Linux', version: 'x86_64' },
      device: { vendor: undefined, model: undefined, type: undefined },
      cpu: { architecture: 'amd64' }
    }
    r.getUA()
    //'Mozilla/5.0 (X11; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0'
    r.setUA()

   const r2=get_ua(WX_UA).getResult()
   const r3={
      ua: 'Mozilla/5.0 (Linux; Android 6.0; 1503-M02 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/37.0.0.0 Mobile MQQBrowser/6.2 TBS/036558 Safari/537.36 MicroMessenger/6.3.25.861 NetType/WIFI Language/zh_CN',
      browser: { name: 'WeChat', version: '6.3.25.861', major: '6' },
      engine: { name: 'Blink', version: '37.0.0.0' },
      os: { name: 'Android', version: '6.0' },
      device: { vendor: 'Generic', model: 'Android 6.0', type: undefined },
      cpu: { architecture: undefined }
    }

    console.log(r1)
    console.log(r2)
}

test_get_ua()

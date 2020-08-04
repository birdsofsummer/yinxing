```javascript
{
  url: 'https://aip.baidubce.com/oauth/2.0/token',
  method: 'post',
  form: {
    grant_type: 'client_credentials',
    client_id: '****',
    client_secret: '****'
  }
}


token={
  "refresh_token": "25.4c33858c06afe6a248bf01266cfcdc64.315360000.1898331095.282335-18091708",
  "expires_in": 2592000,
  "session_key": "9mzdCPa48Znusx3KItLxY3HDzgutaG5lLPRBo/+CcII9GSTgBfaDOUoMsSr0FvAeque2miY60njevdlxtEUgYrSXsDmxBA==",
  "session_secret": "67279c8b8379381f5f9e4ef2eb42ad1f",
  "access_token": "24.32ec942a04b1cb0d033dfc60c7b9b6a1.2592000.1585563095.282335-18091708",
  "scope": "audio_voice_assistant_get brain_enhanced_asr audio_tts_post public brain_all_scope picchain_test_picchain_api_scope wise_adapt lebo_resource_base lightservice_public hetu_basic lightcms_map_poi kaidian_kaidian ApsMisTest_Test权限 vis-classify_flower lpq_开放 cop_helloScope ApsMis_fangdi_permission smartapp_snsapi_base iop_autocar oauth_tp_app smartapp_smart_game_openapi oauth_sessionkey smartapp_swanid_verify smartapp_opensource_openapi smartapp_opensource_recapi fake_face_detect_开放Scope vis-ocr_虚拟人物助理 idl-video_虚拟人物助理",
}

{
  method: 'POST',
  url: 'http://tsn.baidu.com/text2audio',
  headers: {
    Host: 'tsn.baidu.com',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  encoding: null,
  timeout: 10000,
  form: {
    spd: 3,
    per: 103,
    pit: 6,
    vol: 5,
    tex: '叼',
    lan: 'zh',
    ctp: 1,
    tok: '24.156d7693d4b160a0284d7f91943d9996.2592000.1585562849.282335-18091708',
    cuid: '354c36115fb56da0c51afa1ab0761c9f'
  }
}



```



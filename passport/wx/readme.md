cloudflare worker

======

```javascript
const xml2json=(xml)=>{
    var parser = require('xml2json');
    json = parser.toJson(xml);
    j=JSON.parse(json)['xml']
    let {ToUserName,FromUserName,}=j
    return j
    //let {ToUserName,FromUserName,CreateTime,MsgType,Title,Description,Url,MsgId}=j
}

```
```xml
<xml><ToUserName><![CDATA[gh_10f6c3c3ac5a]]></ToUserName><FromUserName><![CDATA[oyORnuP8q7ou2gfYjqLzSIWZf0rs]]></FromUserName><CreateTime>1409735668</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[abcdteT]]></Content><MsgId>6054768590064713728</MsgId><Encrypt><![CDATA[hyzAe4OzmOMbd6TvGdIOO6uBmdJoD0Fk53REIHvxYtJlE2B655HuD0m8KUePWB3+LrPXo87wzQ1QLvbeUgmBM4x6F8PGHQHFVAFmOD2LdJF9FrXpbUAh0B5GIItb52sn896wVsMSHGuPE328HnRGBcrS7C41IzDWyWNlZkyyXwon8T332jisa+h6tEDYsVticbSnyU8dKOIbgU6ux5VTjg3yt+WGzjlpKn6NPhRjpA912xMezR4kw6KWwMrCVKSVCZciVGCgavjIQ6X8tCOp3yZbGpy0VxpAe+77TszTfRd5RJSVO/HTnifJpXgCSUdUue1v6h0EIBYYI1BD1DlD+C0CR8e6OewpusjZ4uBl9FyJvnhvQl+q5rv1ixrcpCumEPo5MJSgM9ehVsNPfUM669WuMyVWQLCzpu9GhglF2PE=]]></Encrypt></xml>

```

```json
{
  "ToUserName": "gh_10f6c3c3ac5a",
  "FromUserName": "oyORnuP8q7ou2gfYjqLzSIWZf0rs",
  "CreateTime": "1409735668",
  "MsgType": "text",
  "Content": "abcdteT",
  "MsgId": "6054768590064713728",
  "Encrypt": "hyzAe4OzmOMbd6TvGdIOO6uBmdJoD0Fk53REIHvxYtJlE2B655HuD0m8KUePWB3+LrPXo87wzQ1QLvbeUgmBM4x6F8PGHQHFVAFmOD2LdJF9FrXpbUAh0B5GIItb52sn896wVsMSHGuPE328HnRGBcrS7C41IzDWyWNlZkyyXwon8T332jisa+h6tEDYsVticbSnyU8dKOIbgU6ux5VTjg3yt+WGzjlpKn6NPhRjpA912xMezR4kw6KWwMrCVKSVCZciVGCgavjIQ6X8tCOp3yZbGpy0VxpAe+77TszTfRd5RJSVO/HTnifJpXgCSUdUue1v6h0EIBYYI1BD1DlD+C0CR8e6OewpusjZ4uBl9FyJvnhvQl+q5rv1ixrcpCumEPo5MJSgM9ehVsNPfUM669WuMyVWQLCzpu9GhglF2PE="
}

```


```javascript
const {
    wx_token="***",
    wx_EncodingAESKey="****",
    wx_AppID="****",
    wx_AppSecret="****",
}=process.env

test_weechat=()=>{
    var config = {
          token: wx_token,
          appid: wx_AppID,
          encodingAESKey: wx_EncodingAESKey,
          checkSignature: true ,
    }
    var wechat = require('wechat')
    r=wechat(config)
    //r=...
    r.Event()
    r.List()
    r.checkSignature()
    r.event()
    r.image()
    r.link()
    r.location()
    r.reply()
    r.reply2CustomerService()
    r.shortvideo()
    r.text()
    r.toXML()
    r.video()
    r.voice()
}



test=()=>{
    var WechatAPI = require('wechat-api');
    var w = new WechatAPI(wx_AppID, wx_AppSecret);
    WechatAPI.patch("updateInfo", "https://api.weixin.qq.com/card/membercard/updateuser");
    r1=await w._updateRemark('open_id', 'remarked')    
    r2=await w._updateInfo({})

    r=await w._activateMembercard()
    r=await w._activateMembercardUserForm()
    r=await w._addBeaconGroup()
    r=await w._addConsumer()
    r=await w._addExpressTemplate()
    r=await w._addGroupBeacons()
    r=await w._addKfAccount()
    r=await w._addLocations()
    r=await w._addLotteryInfo()
    r=await w._addPoi()
    r=await w._addTemplate()
    r=await w._applyBeacons()
    r=await w._applyBeaconsStatus()
    r=await w._authorizeDevices()
    r=await w._batchGetUsers()
    r=await w._batchgetSubmerchant()
    r=await w._bindBeaconLocation()
    r=await w._bindBeaconWithPages()
    r=await w._bindDevice()
    r=await w._checkCustomizedCodes()
    r=await w._checkInBoardingPass()
    r=await w._checkShakeAccountStatus()
    r=await w._clearQuota()
    r=await w._closeKfSession()
    r=await w._closeOrder()
    r=await w._compelBindDevice()
    r=await w._compelUnbindDevice()
    r=await w._consumeCode()
    r=await w._createCard()
    r=await w._createCardQRCode()
    r=await w._createCustomMenu()
    r=await w._createDeviceQRCode()
    r=await w._createGoods()
    r=await w._createGoodsGroup()
    r=await w._createGroup()
    r=await w._createKfSession()
    r=await w._createLimitQRCode()
    r=await w._createMenu()
    r=await w._createPage()
    r=await w._createQRCode()
    r=await w._createShelf()
    r=await w._createTag()
    r=await w._createTmpQRCode()
    r=await w._decryptCode()
    r=await w._delPoi()
    r=await w._delPrivateTemplate()
    r=await w._deleteBeaconGroup()
    r=await w._deleteCard()
    r=await w._deleteExpressTemplate()
    r=await w._deleteGoods()
    r=await w._deleteGoodsGroup()
    r=await w._deleteGroupBeacons()
    r=await w._deleteKfAccount()
    r=await w._deleteMass()
    r=await w._deletePage()
    r=await w._deleteShelf()
    r=await w._deleteTag()
    r=await w._deliverNotify()
    r=await w._editTag()
    r=await w._getAllExpressTemplates()
    r=await w._getAllGroups()
    r=await w._getAllPrivateTemplate()
    r=await w._getAllShelves()
    r=await w._getApplyProtocol()
    r=await w._getArticleSummary()
    r=await w._getArticleTotal()
    r=await w._getBeacons()
    r=await w._getBindDevice()
    r=await w._getCard()
    r=await w._getCardDataInfo()
    r=await w._getCardExt()
    r=await w._getCards()
    r=await w._getCode()
    r=await w._getColors()
    r=await w._getCustomServiceList()
    r=await w._getDepositCodesCount()
    r=await w._getDeviceQRCode()
    r=await w._getDeviceStatistics()
    r=await w._getDeviceStatisticsList()
    r=await w._getDeviceStatus()
    r=await w._getExpressTemplateById()
    r=await w._getFollowers()
    r=await w._getGoods()
    r=await w._getGoodsByStatus()
    r=await w._getGroupById()
    r=await w._getGroups()
    r=await w._getIndustry()
    r=await w._getInterfaceSummary()
    r=await w._getInterfaceSummaryHour()
    r=await w._getIp()
    r=await w._getJsConfig()
    r=await w._getKfSession()
    r=await w._getKfSessionList()
    r=await w._getKfSessionWaitCase()
    r=await w._getLatestTicket()
    r=await w._getLocations()
    r=await w._getMassMessageStatus()
    r=await w._getMaterial()
    r=await w._getMaterialCount()
    r=await w._getMaterials()
    r=await w._getMedia()
    r=await w._getMemberCardUserInfo()
    r=await w._getMembercard()
    r=await w._getMenu()
    r=await w._getMenuConfig()
    r=await w._getOnlineCustomServiceList()
    r=await w._getOpenID()
    r=await w._getOrderById()
    r=await w._getOrdersByStatus()
    r=await w._getPageStatistics()
    r=await w._getPageStatisticsList()
    r=await w._getPages()
    r=await w._getPoi()
    r=await w._getPois()
    r=await w._getProperties()
    r=await w._getRecords()
    r=await w._getSKUs()
    r=await w._getShakeInfo()
    r=await w._getShelfById()
    r=await w._getSubCats()
    r=await w._getSubmerchant()
    r=await w._getTagUsers()
    r=await w._getTags()
    r=await w._getTicket()
    r=await w._getTotalCardDataInfo()
    r=await w._getUpstreamMsg()
    r=await w._getUpstreamMsgDist()
    r=await w._getUpstreamMsgDistMonth()
    r=await w._getUpstreamMsgDistWeek()
    r=await w._getUpstreamMsgHour()
    r=await w._getUpstreamMsgMonth()
    r=await w._getUpstreamMsgWeek()
    r=await w._getUser()
    r=await w._getUserCumulate()
    r=await w._getUserRead()
    r=await w._getUserReadHour()
    r=await w._getUserShare()
    r=await w._getUserShareHour()
    r=await w._getUserSummary()
    r=await w._getUserTags()
    r=await w._getWXCategory()
    r=await w._getWhichGroup()
    r=await w._importCustomizedCodes()
    r=await w._listBeaconGroup()
    r=await w._massSend()
    r=await w._membersBatchtagging()
    r=await w._membersBatchuntagging()
    r=await w._moveUserToGroup()
    r=await w._orderQuery()
    r=await w._previewImage()
    r=await w._previewNews()
    r=await w._previewText()
    r=await w._previewVideo()
    r=await w._previewVoice()
    r=await w._queryGroupBeacons()
    r=await w._registerShakeAccount()
    r=await w._removeCustomMenu()
    r=await w._removeGroup()
    r=await w._removeMaterial()
    r=await w._removeMenu()
    r=await w._searchBeaconPageRelation()
    r=await w._semantic()
    r=await w._sendCard()
    r=await w._sendCardFromCs()
    r=await w._sendImage()
    r=await w._sendImageFromCs()
    r=await w._sendMpNews()
    r=await w._sendMpNewsFromCs()
    r=await w._sendMusic()
    r=await w._sendMusicFromCs()
    r=await w._sendNews()
    r=await w._sendNewsFromCs()
    r=await w._sendTemplate()
    r=await w._sendText()
    r=await w._sendTextFromCs()
    r=await w._sendVideo()
    r=await w._sendVideoFromCs()
    r=await w._sendVoice()
    r=await w._sendVoiceFromCs()
    r=await w._setExpressForOrder()
    r=await w._setIndustry()
    r=await w._setKfAccountAvatar()
    r=await w._setLotterySwitch()
    r=await w._setPrizeBucket()
    r=await w._setTestWhitelist()
    r=await w._shorturl()
    r=await w._submitSubmerchant()
    r=await w._testCustomMenu()
    r=await w._transferMessage()
    r=await w._transferStatus()
    r=await w._unavailableCode()
    r=await w._unbindDevice()
    r=await w._updateBeacon()
    r=await w._updateBeaconGroup()
    r=await w._updateCard()
    r=await w._updateCardStock()
    r=await w._updateCode()
    r=await w._updateExpressTemplate()
    r=await w._updateFeedback()
    r=await w._updateGoods()
    r=await w._updateGoodsForGroup()
    r=await w._updateGoodsGroup()
    r=await w._updateGoodsStatus()
    r=await w._updateGroup()
    r=await w._updateKfAccount()
    r=await w._updateLuckyMonkeyBalance()
    r=await w._updateMeetingTicket()
    r=await w._updateMemberCardUserInfo()
    r=await w._updateMembercard()
    r=await w._updateMovieTicket()
    r=await w._updateNewsMaterial()
    r=await w._updatePage()
    r=await w._updatePoi()
    r=await w._updateRemark()
    r=await w._updateShelf()
    r=await w._updateStock()
    r=await w._updateSubmerchant()
    r=await w._uploadImage()
    r=await w._uploadImageStream()
    r=await w._uploadLogo()
    r=await w._uploadMPVideo()
    r=await w._uploadMaterial()
    r=await w._uploadMedia()
    r=await w._uploadMediaStream()
    r=await w._uploadNews()
    r=await w._uploadNewsMaterial()
    r=await w._uploadPageIcon()
    r=await w._uploadPicture()
    r=await w._uploadVideoMaterial()
    r=await w._verifyDeviceQRCode()
}


```





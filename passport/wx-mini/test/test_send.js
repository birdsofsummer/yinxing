//https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/init/server.init.html
//https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/database/collection/Collection.aggregate.html
//
//
// 云函数入口文件
const cloud = require('wx-server-sdk')
const fs = require('fs')
const path = require('path')


cloud.init({
     env: cloud.DYNAMIC_CURRENT_ENV,
 //    throwOnNotFound: false,
})


exports.add = (event, context, cb) => {
  return event.x + event.y
}
// 云函数入口函数
exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext()
  const { ENV, OPENID, APPID } = wxContext

  db=cloud.database()
//  db=cloud.database({env:"test"})
  col=db.collection('test')
  const r = await col.get()

  //file
  r=await cloud.uploadFile({
        cloudPath: '1.jpg',
        fileContent: fs.createReadStream(path.join(__dirname, '1.jpg')),
  })

  r=await cloud.downloadFile({ fileID: "xxx", })
  r.fileContent.toString('utf8')

  r=await cloud.deleteFile({ fileList: ['xxx'], })
  r=await cloud.getTempFileURL({ fileList:['cloud://xxx'], })


  d1={
    touser: OPENID,
    msgtype: 'text',
    text: {
      content: '收到',
    },
  }

  d2={
          touser: OPENID,
          msgtype: 'miniprogrampage',
          miniprogrampage: {
                title: 'title',
                pagepath: 'pagepath',
                thumbMediaId: 'thumb_media_id'
          }
    }

  d3={
        touser: OPENID,
        msgtype: 'link',
        link: {
          title: 'Happy Day',
          description: 'Is Really A Happy Day',
          url: 'URL',
          thumbUrl: 'THUMB_URL'
        }
  }

  d4={
        touser: OPENID,
        msgtype: 'image',
        image: {
          mediaId: 'MEDIA_ID'
        }
  }

  await cloud.openapi.customerServiceMessage.send(d1)

  return 'success'
}


//https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-http-api/utils/getQcloudToken.html






test=async ()=>{
    r=await wx.cloud.callFunction({name:"add",data:{x:1,y:2}})
    r1=r.result
    r2=await wx.cloud.uploadFile({ cloudPath: '1.png', filePath: '/sdcard/DCIM/', })
    r3=await wx.cloud.downloadFile({ fileID: 'a7xzcb' })
    r4=await wx.cloud.deleteFile({ fileList: ['a7xzcb'] })
    r5=await wx.cloud.getTempFileURL({ fileList: [{ fileID: 'a7xzcb', maxAge: 60 * 60, }] })

    db = wx.cloud.database()
    col=db.collection('books')
    _ = db.command
    $ = db.command.aggregate

    l=await col.count()
    l=await col.where({ _openid: 'xxx' }).count()

    r=await col.doc('xxx').get()
    r=await col.where({ _openid: 'xxx' }).skip(10).limit(10).get()
    r=await col
      .aggregate()
      .group({
        _id: '$category',
        avgSales: $.avg('$sales')
      })
      .end()

    r=await col.where({ done: false }).update({ data: { progress: _.inc(10) }, })
    r=await col.where({ done: true }).remove()

    d={
            description: "learn cloud database",
            due: new Date("2018-09-01"),
            tags: [
              "cloud",
              "database"
            ],
            location: new db.Geo.Point(113, 23),
            done: false
    }
    r=await col.add({ data: d })
    //onChange=...
    //onError
    cb={ onChange, onError, }
    w=col.watch(cb)
    w=col.orderBy('progress', 'desc').limit(10).where({ _openid: 'xxx' }).watch(cb)
    w=col.doc('x').watch(cb)
    await w.close()

}

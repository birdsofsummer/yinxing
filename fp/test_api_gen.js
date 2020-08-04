const test_api_gen=()=>{
       let api={
                playlist:{
                    //https://www.jianshu.com/p/ce1180eac37b
                    url:"https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg",
                    url1:"",
                    method:"get",
                    params:{
                          uin: '0',
                          format: 'json',
                          inCharset: 'utf-8',
                          outCharset: 'utf-8',
                          notice: '0',
                          platform: 'h5',
                          needNewCode: '1',
                          new_format: '1',
                          pic: '500',
                          disstid: '3719969047', //歌单id
                          type: '1',
                          json: '1',
                          utf8: '1',
                          onlysong: '0',
                          picmid: '1',
                          nosign: '1',
                          song_begin: '0',
                          song_num: '1000', //歌曲数量
                          _: '1537276176570', //unix
                    },
                },
       }
       let http=require('superagent')
       let z=api_gen(api,http)
       let r=await z.playlist({})
        .set('referer','https://y.qq.com/portal/playlist.html')
        console.log(r.body)
}

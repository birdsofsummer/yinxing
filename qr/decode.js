const Canvas = require('canvas')
const Image = Canvas.Image
const qrcode = require('jsqrcode')(Canvas)

const decode=(filename = __dirname + '/qrcode.png')=>new Promise((a,b)=>{
    var image = new Image()
    image.onload = function(){
      try{
        let result = qrcode.decode(image);
        a(result)
      }catch(e){
        b(e)
      }
    }
   //image.src = filename
})

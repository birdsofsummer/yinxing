//https://hkleaks.ru/model/pc/content_Lau_Mun_Shuen_Stella.html
parse_detail=()=>{
    let content= document.querySelector('.sgray11').innerText;
    let t= document.querySelector('.sgray4-img').src
    let type=url2file(t)
    let img=document.querySelector('.sgray3-img').src
    let name= document.querySelector('.sgray11_p1').innerText
    let name_en=document.querySelector('.sgray11_p1').innerText
    return {}
}

parselist=()=>[...document.querySelectorAll('.stable_1')].map(parse_name_card)



parse_name_card=x=>{
    let img=x.style["background-image"]
    let img1=HOST+'/'+img.match(/"(.*)"/)[1]
    let url=HOST+'/'+x.querySelector('.sbtn').attributes.getNamedItem('onclick').value.match(/=(.*)/)[1].replace(/\'/g,'')
    let [zh,en]=img1.split('/') .slice(-1)[0].split('+')
    let en1=en.split('.')[0]
    return [zh,en1,img1,url]
}



const R=require('ramda')
const util=require('utility')
const fs=require('mz/fs')

const {
    pad_s,
    pad_e,
    pad_a,
    map_j,
}=require("../fp")


const say=R.curryN(2,console.log)
const left_zero_4=(s="c")=>s && s.length==2 ? s.padStart(4,"0") : s
const str2uri=(x="鲤")=>encodeURI(x).replace(/%/g,'',).toLowerCase()
const code=(x="鲤")=>parseInt(x.charCodeAt(0))
const hex_code=(x="鲤")=>code(x).toString(16)
const str2hex=(x="鲤")=>hex_code(x).toUpperCase()

//"鲤"
const ascii0=R.pipe(hex_code,left_zero_4,pad_a('\&#x',";"))
const str2unicode=R.pipe(hex_code,left_zero_4,pad_s('\\u'))
const str2unicode1=R.pipe(code,pad_a('&#',";"))

//"鲤鱼"
const ascii=map_j(ascii0)
const unicode=map_j(str2unicode)
const unicode1=map_j(str2unicode1)

const parse_hex=(x='9ca4')=>parseInt(x, 16)
const hex2str=(x='9ca4')=>String.fromCharCode(parse_hex(x))

const convert_hanzi=(x="鲤")=>({
        a:x,
        b:ascii(x),
        c:unicode(x),
        d:unicode1(x),
        e:str2uri(x),
        f:encodeURI(x),
        g:str2hex(x),
})
/*
{
  a: '鲤',
  b: '&#x9ca4;',
  c: '\\u9ca4',
  d: '&#40100;',
  e: 'e9b2a4',
  f: '%E9%B2%A4',
  g: '9CA4'
}
*/

const convert_txt=(file_name1='zi.txt',file_name2='zi.json')=>{
       const zi=fs.readFileSync(file_name).toString()
       const z=zi.replace('\n',"").split('')
       const d=R.uniq(z).map(convert_hanzi)
       return util.writeJSON(file_name2,d)
}

function reconvert(str){
    str = str.replace(/(\\u)(\w{1,4})/gi,function($0){
        return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g,"$2")),16)));
    });
    str = str.replace(/(&#x)(\w{1,4});/gi,function($0){
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g,"$2"),16));
    });
    str = str.replace(/(&#)(\d{1,6});/gi,function($0){
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g,"$2")));
    });

    return str;
}
// find_same("/xxx/yyy/zzz","/xxx/yyy/ddd") -> '/xxx/yyy/'
const find_same=(s1="",s2="")=>{
    let s3=""
    for (let i=0;i<s1.length;i++){
        let d1=s1.slice(i,i+1)
        let d2=s2.slice(i,i+1)
        if (d1==d2){
            s3+=d1
        }else{
            break
        }
    }
    return s3
}

module.exports={
    code,
    hex_code,
    str2hex,
    hex2str,
    parse_hex,
    ascii0,
    ascii,
    str2unicode,
    str2unicode1,
    unicode,
    convert_hanzi,
    convert_txt,
}

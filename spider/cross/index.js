/*


关键字: 瑞数 botgate
特征:   MmEwMD FSSBBIl1UgzbN7N80T

js由数字动态生成。。。
太贱了！！！

每次动态生成MmEwMD
劫持xhr

get("/x")
get("/x?MmEwMD=xxxx")

参考

https://segmentfault.com/a/1190000017541235
http://www.anyun.org/m/view.php?aid=9457&tdsourcetag=s_pcqq_aiomsg
https://github.com/sml2h3/mmewmd_crack_for_wenshu


cookie

{
	"FSSBBIl1UgzbN7N80S": "wrZxnzyHdZiDQ55_kBLucx5aNkuVREOdNShwYLbv1njPvC2qWG82yv1EfywT9T8_",
	"clientlanguage": "zh_CN",
	"FSSBBIl1UgzbN7N80T": "4MySZRHlyNQnRkIuzhiUUcNT.oPs675KR_rRzjxHYtD6PvQFDFHhAm3edH3oPOhhYVfDc9rE60nxsSGD_JrJOeG_AnIeQQ69U44pNQKmyc8muqSsK5YbyrmkBg1xQxFxM2.K7uYaMQ5Wl6JeOvqw.fupoq4b6O7xB6uC10D9In_UK6fwY0FX7y3leDXOa7OLw1nq2E6g3rXCmltf.oHhe0nmd2OTqEOzWOX.ePKUihohJi9TcSknbhepvxHA1NaL0WOYoKOgbva.378_0ihTvv1Sz4yVqvt51SydayYAd86hZl0tRrGlUY5ZuMO_OI3lD2ApCg9.EXFtPOygH1rZLrsU5PMoD5I1pMSNUut3rkopzxvBhqKWLXf79iz_qbd89Ee3",
	"_site_id_cookie": "1",
	"JSESSIONID": "53FC52F62C0831A8CF59EDAB3593218B"
}


不想解析可在直接前端借它的代码一用
参考ff/index.js



列表页
http://www.hbsredcross.org.cn/jzxxgs/index.jhtml
http://www.hbsredcross.org.cn/jzxxgs/index_1.jhtml

详情页
url递增 -> 可绕过列表页直接取详情

数据为图片
简单的可直接取title
复杂的表格
需解析图片。。。。
。。。。
http://www.hbsredcross.org.cn/jzxxgs/20778.jhtml

http://www.hbsredcross.org.cn/u/cms/www/202002/01232149ot1n.png

https://www.npmjs.com/package/astring



*/

const acorn = require("acorn");
const jsx = require("acorn-jsx");
const JSXParser = acorn.Parser.extend(jsx());
const astring=require('astring')

const fs=require('mz/fs')
const cheerio=require('cheerio')
const R=require('ramda')

const {
    generate,
    baseGenerator: {
ArrayExpression,ArrayPattern,ArrowFunctionExpression,AssignmentExpression,AssignmentPattern,AwaitExpression,BinaryExpression,BlockStatement,BreakStatement,CallExpression,ClassBody,ClassDeclaration,ClassExpression,ConditionalExpression,ContinueStatement,DebuggerStatement,DoWhileStatement,EmptyStatement,ExportAllDeclaration,ExportDefaultDeclaration,ExportNamedDeclaration,ExpressionStatement,ForInStatement,ForOfStatement,ForStatement,FunctionDeclaration,FunctionExpression,Identifier,IfStatement,ImportDeclaration,LabeledStatement,Literal,LogicalExpression,MemberExpression,MetaProperty,MethodDefinition,NewExpression,ObjectExpression,ObjectPattern,Program,Property,RegExpLiteral,RestElement,ReturnStatement,SequenceExpression,SpreadElement,Super,SwitchStatement,TaggedTemplateExpression,TemplateElement,TemplateLiteral,ThisExpression,ThrowStatement,TryStatement,UnaryExpression,UpdateExpression,VariableDeclaration,VariableDeclarator,WhileStatement,WithStatement,YieldExpression
    }
}=astring

//console.log(acorn.parse("1 + 1"));
//JSXParser.parse("foo(<bar/>)");

parse_code=(code = 'let answer = 4 + 7 * 5 + 3;\n')=>{
    var ast = acorn.parse(code, { ecmaVersion: 6 })
    return astring.generate(ast)
}

parse1=()=>{
    const file="html/index_5.jhtml"
    const file1="html/1.js"
    const html=fs.readFileSync(file).toString()

    const $=cheerio.load(html)
    const s=$('script')

    let s1=R.range(0,s.length).map(x=>{
        let d=s.eq(x)
        let attr=d['0'].attribs
        for (let i in attr) {
            d[i]=attr[i]
        }
        return d
    })

    s2=s1.map(x=>x.src)
        .filter(x=>x)
    console.log(s2)
    //做混淆用的
    //[ '/4QbVtADbnLVIc/c.FxJzG50F.3e2af61.js' ]
    const js=R.range(0,s.length)
        .map(x=>s.eq(x).html())
        .filter(x=>x)
    const js1=js.map(parse_code)
    const js2=js1.join('\n')

    //闭包拿出来
    const clo=js1[0]
        .replace('(function () {\n','')
        .replace('})();\n','')

   //eval(clo)
   //报错

    window={}
    document={
        scripts:s1,
    }
    eval(js1[0])
    console.log(window)

    //保存一下混淆后的js观摩一下
    fs.writeFileSync(file1,js2)

    //观摩window ...
    window.$_ts._$AF=window.$_ts._$AF.toString()
    fs.writeFileSync('html/window.json',JSON.stringify(window,null,'\t'))
    //window.$_ts._$AF.toString()
}



// _$sc('5EA.')
// _$Rp()


cookie="FSSBBIl1UgzbN7N80S=wrZxnzyHdZiDQ55_kBLucx5aNkuVREOdNShwYLbv1njPvC2qWG82yv1EfywT9T8_; clientlanguage=zh_CN; FSSBBIl1UgzbN7N80T=4MySZRHlyNQnRkIuzhiUUcNT.oPs675KR_rRzjxHYtD6PvQFDFHhAm3edH3oPOhhYVfDc9rE60nxsSGD_JrJOeG_AnIeQQ69U44pNQKmyc8muqSsK5YbyrmkBg1xQxFxM2.K7uYaMQ5Wl6JeOvqw.fupoq4b6O7xB6uC10D9In_UK6fwY0FX7y3leDXOa7OLw1nq2E6g3rXCmltf.oHhe0nmd2OTqEOzWOX.ePKUihohJi9TcSknbhepvxHA1NaL0WOYoKOgbva.378_0ihTvv1Sz4yVqvt51SydayYAd86hZl0tRrGlUY5ZuMO_OI3lD2ApCg9.EXFtPOygH1rZLrsU5PMoD5I1pMSNUut3rkopzxvBhqKWLXf79iz_qbd89Ee3; _site_id_cookie=1; JSESSIONID=53FC52F62C0831A8CF59EDAB3593218B"

HEADERS= {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:73.0) Gecko/20100101 Firefox/73.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
        "Upgrade-Insecure-Requests": "1",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        "referrer": "http://www.hbsredcross.org.cn/jzxxgs/index_0.jhtml",
        'Cookie': cookie,
}


const R=require('ramda')
const superagent=require('superagent')
const cheerio=require('cheerio')


parse=(html="")=>}{
    $=cheerio.load(html)
    o={}
    return o
}

page=(i=0)=>"http://www.hbsredcross.org.cn/jzxxgs/index_"+i+".jhtml"



start=async ()=>{
    n=[1,239].slice(0,1)
    o=[]
    let q={
        //生成的,每次都不同!!!
        MmEwMD: "4rHQUkyN1ujInRN8Dpg_Z3I3qwV5QCE4nG60DadP5AaFxej6zqyb4IXAVYXjxyeb5iU.N562QXl9g.K.pU6GEvKU45L2dAEiPe4OvyY7PpnXHXPfmXhZrWHGVvWxQXzkQdxb7OWjPKc8GDjHEF0eedBMPbRUnLob1KDoscXMCtrvD7CAxIPyXgfCYSNDnmjweSv_3ewC7YXtjrg7O.uG58RH3SuDVOT5.WkbvlOCaeIXOCLPr6vtzenGcbg_f7Er1akyf04mF.P.4XboMa0qpW5SZau1Ygn9TIy4De6UNzI2rOYydHNZshbSPqKBY8ihvTIFHm6046MHiRqi2wzaHMs0_FlVe1WbeiWbzTKbO08rKlWWr8azdHa4pnhsVw4EMQHLsH3ZdbStaznIlKsjSK5SS2j3YEkLxU8RgB5oKvOXPTVlgvilwGzeCCqYcIzoTlQP"
    }
    for (let i of n){
        console.log(i)
        u=page(i)
        r=await superagent
            .get(u)
            .query(q)
            .set(HEADERS)
        console.log(i,r.ok)
        o.push(r)
    }
    console.log('done')
    return o
}

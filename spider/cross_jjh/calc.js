R=require('ramda')
_=require('lodash/fp')
d3=require('d3')
utility=require('utility')
moment=require('moment')


day=(d)=>moment(d.replace(/\s+/,' ')).format('YYYY-MM-DD')

calendar=(d=[])=>{
    d1=R.map(R.props(["日期","捐赠金额"]))(d)
    d2=d1.map(([k,v])=>[day(k),v])
    c1=_.toPairs(R.groupBy(x=>x[0])(d2)).map(([k,v])=>[k,_.sum(_.map(x=>1)(v))])
    c2=_.toPairs(R.groupBy(x=>x[0])(d2)).map(([k,v])=>[k,_.sum(_.map(1)(v))])
    return [c1,c2]
}

start=async ()=>{
    let {summery,data}=await utility.readJSON('data/detail.json')
    let [c1,c2]=calendar(data)
    utility.writeJSON('data/calendar-count.json',c1)
    utility.writeJSON('data/calendar-sum.json',c2)
}


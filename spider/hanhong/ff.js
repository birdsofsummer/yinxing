/*
'韩红爱心·百人援滇', '记忆包裹', '韩红爱心·救在乡间', '韩红爱心·复明中心'

{
  '韩红爱心·百人援滇': 405016.63999999996,
  '记忆包裹': 61884.969999999994,
  '韩红爱心·救在乡间': 215467.23,
  '韩红爱心·复明中心': 67899.16
}
*/

/*
{
  income: '742389.03',
  expenditure: '0.00',
  avgAmount: '188.280251',
  expenditureCount: '0',
  incomeCount: '3943',
  sumAmount: '742389.03'
}
*/


//http://bjhhaxcsjjh.n.gongyibao.cn/g.html?id=c97033d8-0d74-4762-8f5f-7ade64754536&URLparamName=%E6%8D%90%E8%B5%A0%E6%9F%A5%E8%AF%A2



wash=()=>{
    u=require('utility')
    moment=require('moment')
    d3=require('d3')
    R=require('ramda')

    after=(x,start='2020-01-01')=>moment(x).unix()>moment(start).unix()
    d=await u.readJSON("han.json")
    r=d.map(x=>x.dataPoints.list).flat()


    r1=r.filter(x=>after(x.payTime)) //2020-01-01以后de
    r2=R.project([
        "projectTitle",
        "payTime",
        "donationName",
        "amount",
        "userRemark"
    ])(r)


    amount=r.map(x=>x.amount)
    const [max,min,mean,sum,n]=[d3.max,d3.min,d3.mean,d3.sum,x=>x.length].map(x=>x(amount))
    //[ 37650, 0.01, 189.46161616161615,750268,3960 ]
    summery=d[0].dataPoints.customerTotal

    cat=R.compose(
        R.map((v,k)=>R.sum(R.pluck('amount')(v))),
        R.groupBy(x=>x.title)
    )(r)

    cat1=R.compose(
        R.map((v,k)=>R.length(v)),
        R.groupBy(x=>x.title)
    )(r)
//{ '韩红爱心·百人援滇': 2162, '记忆包裹': 458, '韩红爱心·救在乡间': 893, '韩红爱心·复明中心': 447 }

    o={cat,summery,data:r}
    u.writeJSON('han1.json',o)
}


//http://bjhhaxcsjjh.n.gongyibao.cn/g.html?id=c97033d8-0d74-4762-8f5f-7ade64754536&URLparamName=%E6%8D%90%E8%B5%A0%E6%9F%A5%E8%AF%A2
//http://bjhhaxcsjjh.n.gongyibao.cn/api/trade/trade/jet/selectSimpleByPage?pageNo=188&pageSize=20&payState=1&startDate=2019-11-3%2000:00:00&endDate=2020-2-3%2015:16:59

sleep=(n=1)=>new Promise((a,b)=>setTimeout(a,n*1000))

function get(index,status){
		    var url="/api/trade/trade/jet/selectSimpleByPage?pageNo="+index+"&pageSize=20&payState=1";

			if(status){
				var param="";
				param=getParam();
			    if(param!=null && param!=''){
	                url+=param;
	                //get_param=param;
	            }
			    //防止未点击筛选按钮的情况下，加上检索条件，保存检索条件
			}else{
				<!-- if(get_param!=null && get_param!=''){ -->
					param=getParam();
					url+=param;
				<!-- }				 -->
			}

			var ptype=getQueryString("ptype");
            var pid=getQueryString("pid");

            //项目id
            if(pid!=null && pid!=''){
            	url+="&projectId="+pid;
            }
            //项目类型
            if(ptype!=null && ptype!=''){
            	url+="&projectType="+ptype;
            }

            return fetch(url).then(x=>x.json())
		}


o=[]
gets=async ()=>{
    console.log('start')
    n1=+[...document.querySelector('#pager').children].slice(-2)[0].innerText || 198
    for (let i=0;i<n1;i++){
        console.log(i)
        let r=await get(i,false)
        o.push([i,r])
        console.log(i,'done wait...')
        await sleep(1)
    }
    console.log('done!!!!!!!!!!!!!!!!!!!')
    return o
}





$.getJSON(url,function(data){
	            if(data.statusCode>0){
	              var html=template('glist',data.dataPoints);
	              //$("#defaultCount").val(data.dataPoints.total);
				  $("#sum_amount").html("￥"+data.dataPoints.customerTotal.income);
				  var expenditure = data.dataPoints.customerTotal.expenditure;
				  if(expenditure){
				      expenditure = Math.abs(expenditure);
                  }
				  $("#payout_amount").html("￥"+ expenditure);
	              $("#container").empty();
	              $("#container").append(html);

	            //总数目
	              if(index==1){
	            	  var length = parseInt(data.dataPoints.total);//总条数
	                  var numperpage  = parseInt(data.dataPoints.pageSize);//每页条数
	                  //从表单获取分页元素参数
	                  var optInit = getOptionsFromForm();
	                  $("#pager").pagination(length, optInit);

	                  //-----------------------------------
	                  function getOptionsFromForm() {
	                      opt = {
	                          num_edge_entries: 2,
	                          num_display_entries: 4,
	                          callback: pageselectCallback,
	                          items_per_page: numperpage,
	                          prev_text:"上一页",
	                          next_text:"下一页",
	                          isAjax:true,
	                          current_page:getCurrentPage() - 1
	                      }
	                      return opt;
	                  }

	                  //-------------------------------
	                  function pageselectCallback(page_index, jq) {
	                      var page = page_index+1;
	                      doRedirect(page);

	                      //阻止单击事件
	                      return false;
	                  }

	                  function doRedirect(page){
	                	  //false：防止未点击筛选按钮的情况下，加上检索条件
	                	  getData(page,false);
	                      //location.href =  changeUrlArg(location.href,"page",page)
	                  }


	              }
                    $("body").removeClass("loading");
	            }
			})

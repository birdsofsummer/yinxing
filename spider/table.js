//https://cloud.tencent.com/document/product/240/38577

const get_table=()=>[...document.querySelectorAll('table')].flatMap((a,i)=>[...a.querySelectorAll('tr')].map((x)=>[...x.children].flatMap(y=>y.innerText)).map(([Code,Message])=>({Code,Message,type:i})))


const get_table1=()=>[...document.querySelectorAll('table')].map((a,i)=>[...a.querySelectorAll('tr')].map((x)=>[...x.children].flatMap(y=>y.innerText)).map(([Code,Message])=>({Code,Message,type:i})))


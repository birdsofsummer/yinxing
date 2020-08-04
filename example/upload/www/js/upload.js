//SERVER="http://localhost:8080/create"
SERVER="/api/create"

var chunksize=1*1024*1024; //每片大小
step=10 //每次10个
sleep_time=1 //睡1秒

// --------------------------------------------------------------------------------

// one drive 分片上传
async function* upload1() {
    input=document.querySelector('#file2')
    var file=input.files[0];
    var totalsize=file.size;
    n=Math.ceil(totalsize/chunksize)
    n1=Math.ceil(n/step)
    console.log(file)
    console.log(n,n1)
    for (j=0;j<n1;j++){
        for (i=0; i<=step;i++) {
            nn=i+step*j
            if (nn>n) break
            console.log(j,i,nn,"/",n)
            start=nn*chunksize;
            end0=start + chunksize -1
            is_last=end0 > totalsize
            var end= (nn==n || is_last)  ? totalsize : end0;
            var blob = file.slice(start,end);
            b=await read(blob)
            Content_Range='bytes ' + start + '-' + end +'/'+ totalsize
            try{
                yield put([b,Content_Range])
            }catch(e){
                yield e
            }
            if (is_last) break

        }
        console.log(`wait...${j}/${n1}`)
        await sleep(sleep_time)
    }
}

// one drive 分片上传
upload=async ()=>{
  for await (let num of upload1()) {
    console.log(num);
  }
    console.log('done!')
}

// path ="img/2019/12/01/"
upload2=async (url="/api/create",file,path="")=>post_form(url,{file,path})


/*
document.querySelector('#file1').addEventListener('change',()=>{
    input=document.querySelector('#file1')
    var file=input.files[0];
    upload2(SERVER,file)
})
*/
document.querySelector('#file2').addEventListener('change',upload)


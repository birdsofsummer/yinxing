

let h={
	"Host": "app.gushiwen.cn",
	"cookie": "userid=E039E20EA82BD912D189FC62B3389AFD3953B378EF547DE210C320B6E7959B994B964998C9E6A242;pwd=7B3DCF72F0DD87558A6C6F29BAA24DDBBA67BF8E414A0C14692DD9B97B195CC810A01023F13C411C6296D0D02A19DEE68578F36EAE53CEEE8EBEA1B948C906C148441E26384C9ECB",
	"login": "flase",
	"user-agent": "okhttp/3.12.1"
}



api=(
    root="https://app.gushiwen.cn/",
    token="gswapi",
    h={},
)=>({
    cidian: {
        url:"api/other/cidian.aspx",
        method:"post",
        headers:{
            ...h,
            "content-type":"application/x-www-form-urlencoded",
        },
        params:{},
        data:{
            value:"月",
            token:"gswapi",
        },
    },
    onehour:{
        url:"api/onehour/Default10.aspx",
        method:"get",
        params:{
            "page": "1",
            "token": "gswapi",
        },
        headres:h,
        data:{},
    },
    version:{
        url:"version.aspx",
        method:"get",
        params:{
            "sys": "8.1.0",
            "version": "144",
            "token": "gswapi"
        },
        headres:h,
        data:{},
    },
    yi:{
        url:"api/shiwen/ajaxshiwencont11.aspx",
        method:"get",
        params:{
            "idnew": "937F6C48D3F7050A7A1DDE35349988AC",
            "value": "yi",
            "token": "gswapi"
        },
        headres:h,
        data:{},
    },
    yizhu:{
        url:"api/shiwen/ajaxshiwencont11.aspx",
        method:"get",
        params:{
            "idnew": "937F6C48D3F7050A7A1DDE35349988AC",
            "value": "yizhu",
            "token": "gswapi"
        },
        headres:h,
        data:{},
    },
    cont:{
        url:"api/shiwen/ajaxshiwencont11.aspx",
        method:"get",
        params:{
            "idnew": "937F6C48D3F7050A7A1DDE35349988AC",
            "value": "cont",
            "token": "gswapi"
        },
        headres:h,
        data:{},
    },
    shang:{
        url:"api/shiwen/ajaxshiwencont11.aspx",
        method:"get",
        params:{
            "idnew": "937F6C48D3F7050A7A1DDE35349988AC",
            "value": "shang",
            "token": "gswapi"
        },
        headres:h,
        data:{},
    },
})


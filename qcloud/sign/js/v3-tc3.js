const moment=require("moment")
const R=require("ramda")
const crypto = require('crypto');

const today=()=>moment().format("YYYY-MM-DD")
const now=()=>Math.round(moment.now()/1000)
const getHash=(str="")=>{
    let hash = crypto.createHash("sha256");
    return hash.update(str).digest("hex");
}
const sha256=(key="", msg="", method="hex")=>{
    let hmac = crypto.createHmac("sha256", key || "");
    return hmac.update(Buffer.from(msg, 'utf8')).digest(method);
}

const getSignatureKey=(key, date, module)=>{
    let kDate = sha256(('TC3' + key), date, '');
    let kService  = sha256(kDate, module, '');
    let kSigning = sha256(kService, 'tc3_request', '');
    return kSigning;
}

const sign_tc3(secretKey, date, service, str2sign, signMethod) {
    let signingKey = getSignatureKey(secretKey, date, service);
    let signature = sha256(signingKey, str2sign, 'hex');
    return signature;
}


const getTc3Signature=(
    params={},
    header,
    {
        signedHeaders,
        signMethod,
        secretKey,
        secretId,
        algorithm,
        uri,
        querystring,
        date,
        module,
    })=>{
   payloadHash = R.pipe(JSON.stringify,getHash)(payload);
   canonicalHeaders = `content-type:${header["Content-Type"]}\nhost:${header["Host"]}\n`;
   canonicalRequest = `POST\n${uri}\n${querystring}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
   credentialScope = `${date}/${module}/tc3_request`;
   digest = getHash(canonicalRequest);
   string2Sign = `${algorithm}\n${header["X-TC-Timestamp"]}\n${credentialScope}\n${digest}`;
   signature = sign_tc3(secretKey, date, module, string2Sign, signMethod)
   return signature;
}





sign=(d={},config={})=>{
    let signature = getTc3Signature(d, h,config);
    auth =`TC3-HMAC-SHA256 Credential=${secretId}/${date}/${module}/tc3_request, SignedHeaders=content-type;host, Signature=${signature}`;
    h1={
        ...h,
        "Authorization":auth
    }

    return h1



}


init=()=>{
    let t=now()
    let date=today()
    config={
        module,
        signMethod: "TC3-HMAC-SHA256"
        algorithm : "TC3-HMAC-SHA256",
        date,
        secretId
        module,
        uri : "/",
        querystring : "",
        signedHeaders : "content-type;host",
        header:{
            "Content-Type":"application/json; charset=utf-8",
            "Host" : endpoint,
            "X-TC-Action" : Action,
            "X-TC-RequestClient" : sdkVersion,
            "X-TC-Timestamp" : '' + t,
            "X-TC-Version" : apiVersion,
            "X-TC-Region" : Region,
            //"X-TC-Language": Language,
        }
    }
    return config
}



sign1=()=>{
    let c=init()

}



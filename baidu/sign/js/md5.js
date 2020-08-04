const superagent=require("superagent")
const R=require("ramda")
const util = require('util');
const crypto = require('crypto');
var fs = require('fs');
var Q = require('q');



genMd5=(str)=> {
    let md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
}



md5sum = function (data, enc, digest) {
    if (!Buffer.isBuffer(data)) {
        data = new Buffer(data, enc || 'UTF-8');
    }

    var md5 = crypto.createHash('md5');
    md5.update(data);

    return md5.digest(digest || 'base64');
};



md5stream = function (stream, digest) {
    var deferred = Q.defer();

    var md5 = crypto.createHash('md5');
    stream.on('data', function (chunk) {
        md5.update(chunk);
    });
    stream.on('end', function () {
        deferred.resolve(md5.digest(digest || 'base64'));
    });
    stream.on('error', function (error) {
        deferred.reject(error);
    });

    return deferred.promise;
};

md5file = function (filename, digest) {
    return exports.md5stream(fs.createReadStream(filename), digest);
};

md5blob = function (blob, digest) {
    var deferred = Q.defer();

    var reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onerror = function (e) {
        deferred.reject(reader.error);
    };
    reader.onloadend = function (e) {
        if (e.target.readyState === FileReader.DONE) {
            var content = e.target.result;
            var md5 = exports.md5sum(content, null, digest);
            deferred.resolve(md5);
        }
    };
    return deferred.promise;
};

const hash = (data="", key="") =>{
    var sha256Hmac = crypto.createHmac('sha256', key);
    sha256Hmac.update(data);
    return sha256Hmac.digest('hex');
}

module.exports={
    genMd5,
    md5sum,
    md5stream,
    md5file,
    md5blob,
    hash,
}


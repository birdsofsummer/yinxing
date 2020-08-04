require('http').createServer(function (req, res) {
  require('fs').createReadStream('sub.html').pipe(res);
}).listen(3000);


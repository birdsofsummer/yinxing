#! /bin/sh
#bunyan=$basedir/../../node_modules/.bin/bunyan
www_path=./www
mosca --http-port 3000 --http-static  $www_path --http-bundle --verbose #| $bunyan

# {"pid":22375,"hostname":"debian","name":"mosca","level":30,"time":1574838176439,"msg":"server started","mqtt":1883,"http":3000,"v":1}

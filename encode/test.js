const {
    MAX_SAFE_INTEGER,
    MAX_SAFE_INTEGER_STR,
    MIN_SAFE_INTEGER,
    UNSTABLE_METHOD,
    YYYYMMDD,
    YYYYMMDDHHmmss,
    YYYYMMDDHHmmssSSS,
    accessLogDate,
    argumentsToArray,
    assign,
    base64decode,
    base64encode,
    datestruct,
    decodeURIComponent,
    dig,
    encodeURIComponent,
    getOwnEnumerables,
    getParamNames,
    has,
    hash,
    hmac,
    includesInvalidHttpHeaderChar,
    isSafeNumberString,
    logDate,
    map,
    md5,
    noop,
    random,
    randomSlice,
    randomString,
    readJSON,
    readJSONSync,
    replace,
    replaceInvalidHttpHeaderChar,
   // setImmediate,
    sha1,
    sha256,
    spliceOne,
    split,
    splitAlwaysOptimized,
    strictJSONParse,
    timestamp,
    toSafeNumber,
  //  try,
    escape,
    unescape,
    writeJSON,
    writeJSONSync,
}=require('utility')


test=()=>{
  t="cc"
  md5(t)
  md5(Buffer.from(t))
  sha1(t)
  sha256(t)
  hmac('sha1', 'I am a key', 'hello world');

  base64encode('你好￥')
  base64decode('5L2g5aW977+l')
  escape('<script/>"& &amp;')
  unescape('&lt;script/&gt;&quot;&amp; &amp;amp;')
  has({hello: 'world'}, 'hello')


  timestamp()

  randomString(32, '1234567890')
  random(100)
  random(2, 1000)
  random()


  split('foo,bar,,,', ',')




  pkg = readJSONSync('package.json');
  writeJSONSync('package.json', pkg, { replacer: null, space: '\t', })


  async () => {
    const pkg = await readJSON('package.json');
    await writeJSON('package.json', pkg);
  }

}

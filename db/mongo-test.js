'use strict';
// https://cloud.tencent.com/document/product/1130

const test=async()=>{
    const MongoClient = require("mongodb").MongoClient;
    const {mongo}=process.env
    const mc = await MongoClient.connect(mongo,{useNewUrlParser: true})
    const db = mc.db('test')
    const collection = db.collection('test')
    await collection.insertOne({a:1,something:'123'})
    const as = await collection.find().toArray()
    //mc.close()
    return as
}

exports.main_handler = async (event, context, callback) => {
    let r=await test()
    console.log(r)
    return r
}


/*
 *
 配置
{
    poolSize,
    ssl,
    sslValidate,
    sslCA,
    sslCert,
    sslKey,
    sslPass,
    sslCRL,
    autoReconnect,
    noDelay,
    keepAlive,
    keepAliveInitialDelay,
    connectTimeoutMS,
    family,
    socketTimeoutMS,
    reconnectTries,
    reconnectInterval,
    ha,
    haInterval,
    replicaSet,
    secondaryAcceptableLatencyMS,
    acceptableLatencyMS,
    connectWithNoPrimary,
    authSource,
    w,
    wtimeout,
    j,
    forceServerObjectId,
    serializeFunctions,
    ignoreUndefined,
    raw,
    bufferMaxEntries,
    readPreference,
    pkFactory,
    promiseLibrary,
    readConcern,
    maxStalenessSeconds,
    loggerLevel,
    logger,
    promoteValues,
    promoteBuffers,
    promoteLongs,
    domainsEnabled,
    checkServerIdentity,
    validateOptions,
    appname,
    auth,
    user,
    password,
    authMechanism,
    compression,
    fsync,
    readPreferenceTags,
    numberOfRetries,
    auto_reconnect,
    minSize,
    monitorCommands,
    retryWrites,
    retryReads,
    useNewUrlParser,
    useUnifiedTopology,
    serverSelectionTimeoutMS,
    useRecoveryToken,
    autoEncryption,
    driverInfo,
    tls,
    tlsinsecure,
    tlsAllowInvalidCertificates,
    tlsAllowInvalidHostnames,
    tlsCAFile,
    tlsCertificateFile,
    tlsCertificateKeyFile,
    tlsCertificateKeyFilePassword
}





  mc=await conn()
  db = mc.db('test')
  c= db.collection('test')

  c._findAndModify
  c.aggregate
  c.bulkWrite
  c.collectionName
  c.count
  c.countDocuments
  c.createIndex
  c.createIndexes
  c.dbName
  c.deleteMany
  c.deleteOne
  c.distinct
  c.drop
  c.dropAllIndexes
  c.dropIndex
  c.dropIndexes
  c.ensureIndex
  c.estimatedDocumentCount
  c.find
  c.findAndModify
  c.findAndRemove
  c.findOne
  c.findOneAndDelete
  c.findOneAndReplace
  c.findOneAndUpdate
  c.geoHaystackSearch
  c.getLogger
  c.group
  c.hint
  c.indexExists
  c.indexInformation
  c.indexes
  c.initializeOrderedBulkOp
  c.initializeUnorderedBulkOp
  c.insert
  c.insertMany
  c.insertOne
  c.isCapped
  c.listIndexes
  c.mapReduce
  c.namespace
  c.options
  c.parallelCollectionScan
  c.reIndex
  c.readConcern
  c.remove
  c.removeMany
  c.removeOne
  c.rename
  c.replaceOne
  c.save
  c.stats
  c.update
  c.updateMany
  c.updateOne
  c.watch
  c.writeConcern
*/

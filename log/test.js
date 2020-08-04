const {
    create_logger,
    create_logger1,
}=require('./index')

test=()=>{
   d={x:1,y:2}
   s="ccc"

   l=create_logger1()
   l.debug()
   l.log()
   l.debug(d)
   l.trace(s)
   l.debug(s)
   l.info(s)
   l.warn(s)
   l.error(s)
   l.fatal(s)

   l=create_logger().getLogger('app')

   l.log()
   l.debug(d)
   l.trace(s)
   l.debug(s)
   l.info(s)
   l.warn(s)
   l.error(s)
   l.fatal(s)
}

test1=()=>{
    log.all()
    log.debug()
    log.error()
    log.fatal()
    log.info()
    log.isAllEnabled()
    log.isDebugEnabled()
    log.isErrorEnabled()
    log.isFatalEnabled()
    log.isInfoEnabled()
    log.isMarkEnabled()
    log.isOffEnabled()
    log.isTraceEnabled()
    log.isWarnEnabled()
    log.mark()
    log.off()
    log.trace()
    log.warn()
}

test()

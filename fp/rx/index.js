//https://www.learnrxjs.io/operators/transformation/mergescan.html
//https://rxjs.dev/api/index/function/forkJoin

const R=require('ramda')
const rxjs=require("rxjs")
const op=require('rxjs/operators')

const {
    ajax,
    AjaxResponse,
    AjaxError,
    AjaxTimeoutError,
}=require('rxjs/ajax')


const {
    ArgumentOutOfRangeError,
    AsyncSubject,
    BehaviorSubject,
    ConnectableObservable,
    EMPTY,
    EmptyError,
    GroupedObservable,
    NEVER,
    Notification,
    NotificationKind,
    ObjectUnsubscribedError,
    Observable,
    ReplaySubject,
    Scheduler,
    Subject,
    Subscriber,
    Subscription,
    TimeoutError,
    UnsubscriptionError,
    VirtualAction,
    VirtualTimeScheduler,
    animationFrameScheduler,
    asapScheduler,
    asyncScheduler,
    bindCallback,
    bindNodeCallback,
    combineLatest,
    concat,
    config,
    defer,
    empty,
    forkJoin,
    from,
    fromEvent,
    fromEventPattern,
    generate,
    identity,
    iif,
    interval,
    isObservable,
    merge,
    never,
    noop,
    observable,
    of,
    onErrorResumeNext,
    pairs,
    partition,
    pipe,
    queueScheduler,
    race,
    range,
    scheduled,
    throwError,
    timer,
    using,
    zip,
}=rxjs

const {
    audit,
    auditTime,
    buffer,
    bufferCount,
    bufferTime,
    bufferToggle,
    bufferWhen,
    catchError,
    combineAll,
    //combineLatest,
    //concat,
    concatAll,
    concatMap,
    concatMapTo,
    count,
    debounce,
    debounceTime,
    defaultIfEmpty,
    delay,
    delayWhen,
    dematerialize,
    distinct,
    distinctUntilChanged,
    distinctUntilKeyChanged,
    elementAt,
    endWith,
    every,
    exhaust,
    exhaustMap,
    expand,
    filter,
    finalize,
    find,
    findIndex,
    first,
    flatMap,
    groupBy,
    ignoreElements,
    isEmpty,
    last,
    map,
    mapTo,
    materialize,
    max,
    //merge,
    mergeAll,
    mergeMap,
    mergeMapTo,
    mergeScan,
    min,
    multicast,
    observeOn,
    //onErrorResumeNext,
    pairwise,
    //partition,
    pluck,
    publish,
    publishBehavior,
    publishLast,
    publishReplay,
    //race,
    reduce,
    refCount,
    repeat,
    repeatWhen,
    retry,
    retryWhen,
    sample,
    sampleTime,
    scan,
    sequenceEqual,
    share,
    shareReplay,
    single,
    skip,
    skipLast,
    skipUntil,
    skipWhile,
    startWith,
    subscribeOn,
    switchAll,
    switchMap,
    switchMapTo,
    take,
    takeLast,
    takeUntil,
    takeWhile,
    tap,
    throttle,
    throttleTime,
    throwIfEmpty,
    timeInterval,
    timeout,
    timeoutWith,
    timestamp,
    toArray,
    //window,
    windowCount,
    windowTime,
    windowToggle,
    windowWhen,
    withLatestFrom,
    //zip,
    zipAll,
}=op

const say=(x="")=>(y="")=>(console.log(x,y),y)
const say1=(x="")=>async (y="")=>(console.log(x,await y),y)


const init_result=(t=[])=>({
       ok:new Set(),
       fail:new Set(t),
       times:0,
       result:{},
       e:{},
})


const seq2=(t=[],time=1000)=>from(t)
    .pipe(
        op.zip(
            interval(time)
            .pipe(take(t.length))
        )
    )

//同步
//只重试失败的部分
//------------------------------------------------------------------------
const seq_safe=(fn,t=[],max_retry_times=3)=>{
   if (R.isEmpty(t)) throw "????"
   let r0={
       ok:new Set(),
       fail:new Set(t),
       times:0,
       result:{},
   }
   let d=from(t)
         .pipe(
              scan((a,b)=>{
                 a.times += 1
                 try{
                    let r=fn(b)
                    a.ok.add(b)
                    a.result[b]=r
                    a.fail.delete(b)
                    return a
                 }catch(e){
                     throw a
                 }
             },r0),
              retryWhen(e=>e.pipe(
                  takeWhile(x=>x.fail.size>0),
                  take(max_retry_times),
                  tap(say('retry')),
                  scan((a,b)=>(console.log('retry : #',a),a+1),0),
                  delayWhen(x => timer(x * 1000)),
                  //delay(1000),
              )),
       )
    return d
}

//异步
//全量重试
//------------------------------------------------------------------------
const seq_safe_async=(fn,t=[],max_retry_times=3)=>{
   if (R.isEmpty(t)) throw "????"
   let d=of(t)
         .pipe(
         mergeMap(x=>forkJoin(...x.map(fn))),
         retryWhen(e=>e.pipe(
                  //tap(say('retry')),
                  take(max_retry_times),
                  scan((a,b)=>(console.log('retry : #',a),a+1),0),
                  delayWhen(x => timer(x * 1000)),
                  //delay(1000),
              )),
       )
    return d
}

//异步
//全量重试
const seq_safe_async2=(fn,t=[],max_retry_times=3)=>{
    if (R.isEmpty(t)) throw "????"
    let r0=init_result(t)
    const run=async y=>{
                try{
                    return [y,await fn(y)]
                }catch(e){
                    return [y,{ok:false,e}]
                }
    }
    let d=of(t)
        .pipe(
            tap(say('----')),
            mergeMap(x=>forkJoin([...x].map(run))),
            scan((a,b,i)=>{
                a.times+=1
                b.forEach(([x,y])=>{
                    if (y.ok){
                        a.result[x]=y
                        a.ok.add(x)
                        a.fail.delete(x)
                    }else{
                        a.e[x]=y.e
                        throw a
                    }
               })
               return a
            },r0),
            retryWhen(e=>e.pipe(
                   //tap(say('retry')),
                    scan((a,b)=>(console.log('retry : #',a),a+1),0),
                    delayWhen(x => timer(x * 1000)),
                    take(max_retry_times),
                )
            ),
            //retry(4),
        )
    return d
}


//异步
//只重试失败部分
//------------------------------------------------------------------------
const seq_safe_async3=(fn,t=[],max_retry_times=3)=>{
   if (R.isEmpty(t)) throw "????"
   const reducer=(a,b,i) => {
            //console.log('$$$$$',a,b,i)
            ++a.times
            let todo=[...a.fail]
            let run=async x=>{
                try{
                    let r=await fn(x)
                     a.ok.add(x)
                     a.result[x]=r
                     a.fail.delete(x)
                     return a
                }catch(e){
                     a.e[x]=e
                    throw a
                }
            }
            return forkJoin(todo.map(run)) //
         }
   let r0=init_result(t)
   let d=of(t)
       .pipe(
        mergeScan(reducer,r0),
         //op.combineLatest(),
         mergeAll(),
         retryWhen(e=>e.pipe(
              //tap(say('retry')),
              takeWhile(x=>x.fail.size>0),
              take(max_retry_times),
              scan((a,b)=>(console.log('retry : #',a),a+1),0),
              delayWhen(x => timer(x * 1000)),
              //delay(1000),
          )),
         takeLast(1),
       )
    return d
}


//异步
//只重试失败部分
//------------------------------------------------------------------------

const seq_safe_async4=(fn,t=[],max_retry_times=3)=>{
    if (R.isEmpty(t)) throw "????"
    const reducer=async (a,b,i)=>{
         a.times++
         try{
             let r=await fn(b)
             a.result[b]=r
             a.ok.add(b)
             a.fail.delete(b)
             return a
         }catch(e){
             a.e[b]=e
             throw a
         }
     }
     let r0=init_result(t)
     let d=from(t)
    .pipe(
        mergeScan((a,b,i) => forkJoin(reducer(a,b,i)),r0),
        map(x=>x[0]),
        retryWhen(e=>e.pipe(
              //tap(say('retry')),
              takeWhile(x=>x.fail.size>0),
              take(max_retry_times),
              scan((a,b)=>(console.log('retry : #',a),a+1),0),
              delayWhen(x => timer(x * 1000)),
              //delay(1000),
        )),
      //  retry(3),
        takeLast(1),
    )
    return d
}

module.exports={
    say,
    say1,
    seq2,
    seq_safe,
    seq_safe_async,
    seq_safe_async2,
    seq_safe_async3,
    seq_safe_async4,
}

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



const {
    say,
    say1,
    seq2,
    seq_safe,
    seq_safe_async,
    seq_safe_async2,
    seq_safe_async3,
    seq_safe_async4,
}=require("./index")


const it=async x=>x
const t=[10,20,30,40,50]

const test_fn=x=> {
    console.log('@@@@',x)
    if(x==30 && Math.random()>0.5){
        console.log('xxxxx',x)
        throw {fail:new Set([x])}
    }
    return {ok:true,data:x+100}
}

const test_fn_a=async x=> {
    console.log('@@@@',x)
    if(x==30 && Math.random()>0.5){
        console.log('xxxxx',x)
        throw {fail:new Set([x])}
    }
    return {ok:true,data:x+100}
}

const test_handler={
   next:say1('>>>>'),
   error:say('--ee--'),
   complete:say('done'),
}


//--------------------------------------------------------------------------

const test_seq=(t=[1,2,3])=>seq2(t).subscribe(console.log)


const test_mergeMap=()=>{
    a=[...'abcdef']
    b=x=> interval(1000)
        .pipe(
            map(i => [i,x]),
            take(a.length),
        )
    from(a)
        .pipe(
            mergeMap(b),
        ).subscribe(console.log)
    from(a).pipe(b).subscribe(console.log)
}


const test_retry=()=>{
    interval(1000)
        .pipe(
            take(t.length),
            mergeMap(x => {
                  r=test_fn(x)
                  return of(r)
            }),
            retry(2)
        )
        .subscribe(test_handler)
}

const test_retry1=()=>{
   let d=from(t)
      .pipe(
          tap(say('+++')),
          scan((a,b)=>{
              if (a == 2){
                  throw a+1
              }
              return a+1
          },0),
          retryWhen(e=>e.pipe(
              take(3),
              tap(say('retry')),
              scan((a,b)=>(console.log('#',a),a+1),0),
              //delay(1000),
              delayWhen(x => timer(x * 1000)),
          )),
     )
    d.subscribe(test_handler)
}

const test_retry2=()=>{

    const h=test_handler
    const f1=test_fn
    const f2=test_fn_a

    seq_safe(f1,t).subscribe(h)

    seq_safe_async (f2,t).subscribe(h)
    seq_safe_async2(f2,t).subscribe(h)
    seq_safe_async3(f2,t).subscribe(h)
    seq_safe_async4(f2,t).subscribe(h)
}


const test_gets=()=>{
    const superagent=require('superagent')
    const get=x=>superagent
        .get(x)
        .timeout(1000)
        .then(y=>y.status)

    const u=[
        "http://www.baidu.com",
        "http://www.baidu1.com",
    ]
    const fn=get
    const h=test_handler
    seq_safe_async3(fn,u).subscribe(h)
    seq_safe_async4(fn,u).subscribe(h)
}


/*
(()=>{



})()

*/


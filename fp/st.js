//https://www.npmjs.com/package/sanctuary
//https://github.com/sanctuary-js/sanctuary#readme

const S=require('sanctuary')
const $ = require ('sanctuary-def');
const type = require ('sanctuary-type-identifiers');

const {
    Either,
    I,
    Just,
    K,
    Left,
    Maybe,
    Nothing,
    Pair,
    Right,
    T,
    add,
    all,
    alt,
    and,
    any,
    ap,
    apFirst,
    apSecond,
    append,
    array,
    bimap,
    boolean,
    chain,
    chainRec,
    clamp,
    complement,
    compose,
    concat,
    contramap,
    create,
    curry2,
    curry3,
    curry4,
    curry5,
    div,
    drop,
    dropLast,
    dropWhile,
    duplicate,
    either,
    eitherToMaybe,
    elem,
    empty,
    encase,
    env,
    equals,
    even,
    extend,
    extract,
    filter,
    find,
    flip,
    foldMap,
    fromEither,
    fromMaybe,
    fromMaybe_,
    fromPairs,
    fst,
    get,
    gets,
    groupBy,
    gt,
    gte,
    head,
    id,
    ifElse,
    init,
    insert,
    invert,
    is,
    isJust,
    isLeft,
    isNothing,
    isRight,
    join,
    joinWith,
    justs,
    keys,
    last,
    lefts,
    lift2,
    lift3,
    lines,
    lt,
    lte,
    map,
    mapLeft,
    mapMaybe,
    match,
    matchAll,
    max,
    maybe,
    maybeToEither,
    maybeToNullable,
    maybe_,
    mean,
    min,
    mult,
    negate,
    none,
    not,
    odd,
    of,
    on,
    or,
    pair,
    pairs,
    parseDate,
    parseFloat,
    parseInt,
    parseJson,
    pipe,
    pipeK,
    pow,
    prepend,
    product,
    promap,
    prop,
    props,
    range,
    reduce,
    regex,
    regexEscape,
    reject,
    remove,
    reverse,
    rights,
    sequence,
    show,
    singleton,
    size,
    snd,
    sort,
    sortBy,
    splitOn,
    splitOnRegex,
    stripPrefix,
    stripSuffix,
    sub,
    sum,
    swap,
    tagBy,
    tail,
    take,
    takeLast,
    takeWhile,
    test,
    toLower,
    toUpper,
    traverse,
    trim,
    //type,
    unchecked,
    unfoldr,
    unless,
    unlines,
    unwords,
    value,
    values,
    when,
    words,
    zero,
    zip,
    zipWith
}=S



const test=()=>{
//    //    Identity :: a -> Identity a
//    const Identity = x => {
//      const identity = Object.create (Identity$prototype);
//      identity.value = x;
//      return identity;
//    };
//
//    Identity['@@type'] = 'my-package/Identity@1';
//
//    const Identity$prototype = {
//      'constructor': Identity,
//      '@@show': function() { return `Identity (${S.show (this.value)})`; },
//      'fantasy-land/map': function(f) { return Identity (f (this.value)); },
//    };
//
//    //    IdentityType :: Type -> Type
//    const IdentityType = $.UnaryType
//      ('Identity')
//      ('http://example.com/my-package#Identity')
//      ([])
//      (x => type (x) === Identity['@@type'])
//      (identity => [identity.value]);
//
//    const S = create ({
//      checkTypes: process.env.NODE_ENV !== 'production',
//      env: env.concat ([IdentityType ($.Unknown)]),
//    });
//
//    S.map (S.sub (1)) (Identity (43));
//    // => Identity (42)
//

    const S = sanctuary.create ({
      checkTypes: localStorage.getItem ('SANCTUARY_CHECK_TYPES') === 'true',
      env: sanctuary.env,
    });


    S.tail ([])
    S.tail (['foo'])

    S.stripPrefix ('x') ('abc')
    S.stripPrefix ('x') ('xabc')

    S.compose (Math.sqrt) (S.add (1)) (99)

    S.pipe([ S.map (S.add(100)), S.filter (S.gt(101)),]) ([1,2,30])
    S.pipe ([S.add (1), Math.sqrt, S.sub (1)]) (99)
    S.pipeK ([S.tail, S.tail, S.head]) (S.Just ([1, 2, 3, 4]))

    xs=[1,2,3]
    S.reduce (S.add) (0) (xs)

    S.add (2) (true) //err
    S.add (2) (1)

    //弱类型
    S.unchecked.map (S.show) ({x: 'foo', y: true, z: 42})
    S.unchecked.add (2) ('2')

    S.type (S.Just (42))
    S.type ([1, 2, 3])

    S.is ($.Array ($.Integer)) ([1, 2, 3])
    S.is ($.Array ($.Integer)) ([1, 2, 3.14])


    //to string
    S.show (-0)
    S.show (['foo', 'bar', 'baz'])
    S.show ({x: 1, y: 2, z: 3})
    S.show (S.Left (S.Right (S.Just (S.Nothing))))

    S.equals (0) (-0)
    S.equals (NaN) (NaN)
    S.equals (S.Just ([1, 2, 3])) (S.Just ([1, 2, 3]))
    S.equals (S.Just ([1, 2, 3])) (S.Just ([1, 2, 4]))

    // lt,lte,gt,gte
    S.filter (S.lt (3)) ([1, 2, 3, 4, 5])
    S.filter (S.lte (3)) ([1, 2, 3, 4, 5])
    S.filter (S.gt (3)) ([1, 2, 3, 4, 5])
    S.filter (S.gte (3)) ([1, 2, 3, 4, 5])

    S.min (10) (2)
    S.min (new Date ('1999-12-31')) (new Date ('2000-01-01'))
    S.min ('10') ('2')

    S.max (10) (2)
    S.max (new Date ('1999-12-31')) (new Date ('2000-01-01'))
    S.max ('10') ('2')


    //坐标轴远近
    S.clamp (0) (100) (42)
    S.clamp (0) (100) (-1)
    S.clamp ('A') ('Z') ('~')

    S.id (Function) (42)
    S.concat ('abc') ('def')
    S.concat ([1, 2, 3]) ([4, 5, 6])
    S.concat ({x: 1, y: 2}) ({y: 3, z: 4})
    S.concat (S.Just ([1, 2, 3])) (S.Just ([4, 5, 6]))
    S.concat (Sum (18)) (Sum (24))
    S.empty (String)
    S.empty (Array)
    S.empty (Object)
    S.empty (Sum)
    S.invert (Sum (5))

    S.filter (S.odd) ([1, 2, 3])
    S.filter (S.odd) ({x: 1, y: 2, z: 3})
    S.filter (S.odd) (S.Nothing)
    S.filter (S.odd) (S.Just (0))
    S.filter (S.odd) (S.Just (1))

    S.reject (S.odd) ([1, 2, 3])
    S.reject (S.odd) ({x: 1, y: 2, z: 3})
    S.reject (S.odd) (S.Nothing)
    S.reject (S.odd) (S.Just (0))
    S.reject (S.odd) (S.Just (1))

    S.map (Math.sqrt) ([1, 4, 9])
    S.map (Math.sqrt) ({x: 1, y: 4, z: 9})
    S.map (Math.sqrt) (S.Just (9))
    S.map (Math.sqrt) (S.Right (9))
    S.map (Math.sqrt) (S.Pair (99980001) (99980001))
    S.map (Math.sqrt) (S.add (1)) (99)
    S.map (S.toUpper) (S.head (words))

    S.flip (S.concat) ('!') ('foo')
    S.flip ([Math.floor, Math.ceil]) (1.5)
    S.flip ({floor: Math.floor, ceil: Math.ceil}) (1.5)
    S.flip (Cons (Math.floor) (Cons (Math.ceil) (Nil))) (1.5)

    S.bimap (S.toUpper) (Math.sqrt) (S.Pair ('foo') (64))
    //Pair ('FOO') (8)
    S.bimap (S.toUpper) (Math.sqrt) (S.Left ('foo'))
    //Left ('FOO')
    S.bimap (S.toUpper) (Math.sqrt) (S.Right (64))
    //Right (8)

    S.mapLeft (S.toUpper) (S.Pair ('foo') (64))
    //Pair ('FOO') (64)
    S.mapLeft (S.toUpper) (S.Left ('foo'))
    //Left ('FOO')
    S.mapLeft (S.toUpper) (S.Right (64))
    //Right (64)
    S.promap (Math.abs) (S.add (1)) (Math.sqrt) (-100)
    //11
    S.alt (S.Just ('default')) (S.Nothing)
    //Just ('default')
    S.alt (S.Just ('default')) (S.Just ('hello'))
    //Just ('hello')
    S.alt (S.Right (0)) (S.Left ('X'))
    //Right (0)
    S.alt (S.Right (0)) (S.Right (1))
    //Right (1)
    S.zero (Array)
    //[]
    S.zero (Object)
    //{}
    S.zero (S.Maybe)
    //Nothing
    S.reduce (S.add) (0) ([1, 2, 3, 4, 5])
    //15
    S.reduce (xs => x => S.prepend (x) (xs)) ([]) ([1, 2, 3, 4, 5])
    //[5, 4, 3, 2, 1]
    S.traverse (Array) (S.words) (S.Just ('foo bar baz'))
    //[Just ('foo'), Just ('bar'), Just ('baz')]
    S.traverse (Array) (S.words) (S.Nothing)
    //[Nothing]
    S.traverse (S.Maybe) (S.parseInt (16)) (['A', 'B', 'C'])
    //Just ([10, 11, 12])
    S.traverse (S.Maybe) (S.parseInt (16)) (['A', 'B', 'C', 'X'])
    //Nothing
    S.traverse (S.Maybe) (S.parseInt (16)) ({a: 'A', b: 'B', c: 'C'})
    //Just ({a: 10, b: 11, c: 12})
    S.traverse (S.Maybe) (S.parseInt (16)) ({a: 'A', b: 'B', c: 'C', x: 'X'})
    //Nothing
    S.sequence (Array) (S.Just ([1, 2, 3]))
    //[Just (1), Just (2), Just (3)]
    S.sequence (S.Maybe) ([S.Just (1), S.Just (2), S.Just (3)])
    //Just ([1, 2, 3])
    S.sequence (S.Maybe) ([S.Just (1), S.Just (2), S.Nothing])
    //Nothing
    S.sequence (S.Maybe) ({a: S.Just (1), b: S.Just (2), c: S.Just (3)})
    //Just ({a: 1, b: 2, c: 3})
    S.sequence (S.Maybe) ({a: S.Just (1), b: S.Just (2), c: S.Nothing})
    //Nothing
    S.ap ([Math.sqrt, x => x * x]) ([1, 4, 9, 16, 25])
    //[1, 2, 3, 4, 5, 1, 16, 81, 256, 625]
    S.ap ({x: Math.sqrt, y: S.add (1), z: S.sub (1)}) ({w: 4, x: 4, y: 4})
    //{x: 2, y: 5}
    S.ap (S.Just (Math.sqrt)) (S.Just (64))
    //Just (8)
    S.ap (s => n => s.slice (0, n)) (s => Math.ceil (s.length / 2)) ('Haskell')
    S.lift2 (S.add) (S.Just (2)) (S.Just (3))
    //Just (5)
    S.lift2 (S.add) (S.Just (2)) (S.Nothing)
    //Nothing
    S.lift2 (S.and) (S.Just (true)) (S.Just (true))
    //Just (true)
    S.lift2 (S.and) (S.Just (true)) (S.Just (false))
    //Just (false)
    S.lift3 (S.reduce) (S.Just (S.add)) (S.Just (0)) (S.Just ([1, 2, 3]))
    //Just (6)
    S.lift3 (S.reduce) (S.Just (S.add)) (S.Just (0)) (S.Nothing)
    //Nothing
    S.apFirst ([1, 2]) ([3, 4])
    //[1, 1, 2, 2]
    S.apFirst (S.Just (1)) (S.Just (2))
    //Just (1)
    S.apSecond ([1, 2]) ([3, 4])
    //[3, 4, 3, 4]
    S.apSecond (S.Just (1)) (S.Just (2))
    //Just (2)
    S.of (Array) (42)
    //[42]
    S.of (Function) (42) (null)
    //42
    S.of (S.Maybe) (42)
    //Just (42)
    S.of (S.Either) (42)
    //Right (42)
    S.chain (x => [x, x]) ([1, 2, 3])
    //[1, 1, 2, 2, 3, 3]
    S.chain (n => s => s.slice (0, n)) (s => Math.ceil (s.length / 2)) ('slice')
    //'sli'
    S.chain (S.parseInt (10)) (S.Just ('123'))
    //Just (123)
    S.chain (S.parseInt (10)) (S.Just ('XXX'))
    //Nothing
    S.join ([[1], [2], [3]])
    //[1, 2, 3]
    S.join ([[[1, 2, 3]]])
    //[[1, 2, 3]]
    S.join (S.Just (S.Just (1)))
    //Just (1)
    S.join (S.Pair ('foo') (S.Pair ('bar') ('baz')))
    //Pair ('foobar') ('baz')
    S.join (S.concat) ('abc')
    //'abcabc'
    S.chainRec (Array)
    (s => s.length === 2 ? S.map (S.Right) ([s + '!', s + '?'])
    : S.map (S.Left) ([s + 'o', s + 'n']))
    ('')
    //['oo!', 'oo?', 'on!', 'on?', 'no!', 'no?', 'nn!', 'nn?']
    S.extend (S.joinWith ('')) (['x', 'y', 'z'])
    //['xyz', 'yz', 'z']
    S.extend (f => f ([3, 4])) (S.reverse) ([1, 2])
    //[4, 3, 2, 1]
    S.duplicate (S.Just (1))
    //Just (Just (1))
    S.duplicate ([1])
    //[[1]]
    S.duplicate ([1, 2, 3])
    //[[1, 2, 3], [2, 3], [3]]
    S.duplicate (S.reverse) ([1, 2]) ([3, 4])
    //[4, 3, 2, 1]
    S.extract (S.Pair ('foo') ('bar'))
    //'bar'
    S.contramap (s => s.length) (Math.sqrt) ('Sanctuary')
    //3
    S.I ('foo')
    //'foo'
    S.K ('foo') ('bar')
    //'foo'
    S.map (S.K (42)) (S.range (0) (5))
    //[42, 42, 42, 42, 42]
    S.T (42) (S.add (1))
    //43
    S.map (S.T (100)) ([S.add (1), Math.sqrt])
    //[101, 10]
    S.map (S.curry2 (Math.pow) (10)) ([1, 2, 3])
    //[10, 100, 1000]

    const replaceString = S.curry3 ((what, replacement, string) =>
    string.replace (what, replacement)
    )
    replaceString ('banana') ('orange') ('banana icecream')
    //'orange icecream'
    const createRect = S.curry4 ((x, y, width, height) =>
    ({x, y, width, height})
    )
    createRect (0) (0) (10) (10)
    //{x: 0, y: 0, width: 10, height: 10}
    const toUrl = S.curry5 ((protocol, creds, hostname, port, pathname) =>
    protocol + '//' +
    S.maybe ('') (S.flip (S.concat) ('@')) (creds) +
    hostname +
    S.maybe ('') (S.concat (':')) (port) +
    pathname
    )
    toUrl ('https:') (S.Nothing) ('example.com') (S.Just ('443')) ('/foo/bar')
    //'https://example.com:443/foo/bar'
    S.compose (Math.sqrt) (S.add (1)) (99)
    //10
    S.pipe ([S.add (1), Math.sqrt, S.sub (1)]) (99)
    //9
    S.pipeK ([S.tail, S.tail, S.head]) (S.Just ([1, 2, 3, 4]))
    //Just (3)
    S.on (S.concat) (S.reverse) ([1, 2, 3]) ([4, 5, 6])
    //[3, 2, 1, 6, 5, 4]
    S.Pair ('foo') (42)
    //Pair ('foo') (42)
    S.pair (S.concat) (S.Pair ('foo') ('bar'))
    //'foobar'
    S.fst (S.Pair ('foo') (42))
    //'foo'
    S.snd (S.Pair ('foo') (42))
    //42
    S.swap (S.Pair ('foo') (42))
    //Pair (42) ('foo')
    S.Nothing
    //Nothing
    S.Just (42)
    //Just (42)
    S.isNothing (S.Nothing)
    //true
    S.isNothing (S.Just (42))
    //false
    S.isJust (S.Just (42))
    //true
    S.isJust (S.Nothing)
    //false
    S.fromMaybe (0) (S.Just (42))
    //42
    S.fromMaybe (0) (S.Nothing)
    //0
    function fib(n) { return n <= 1 ? n : fib (n - 2) + fib (n - 1); }
    S.fromMaybe_ (() => fib (30)) (S.Just (1000000))
    //1000000
    S.fromMaybe_ (() => fib (30)) (S.Nothing)
    //832040
    S.maybeToNullable (S.Just (42))
    //42
    S.maybeToNullable (S.Nothing)
    //null
    S.maybe (0) (S.prop ('length')) (S.Just ('refuge'))
    //6
    S.maybe (0) (S.prop ('length')) (S.Nothing)
    //0
    function fib(n) { return n <= 1 ? n : fib (n - 2) + fib (n - 1); }
    S.maybe_ (() => fib (30)) (Math.sqrt) (S.Just (1000000))
    //1000
    S.maybe_ (() => fib (30)) (Math.sqrt) (S.Nothing)
    //832040
    S.justs ([S.Just ('foo'), S.Nothing, S.Just ('baz')])
    //['foo', 'baz']
    S.mapMaybe (S.head) ([[], [1, 2, 3], [], [4, 5, 6], []])
    //[1, 4]
    S.mapMaybe (S.head) ({x: [1, 2, 3], y: [], z: [4, 5, 6]})
    //{x: 1, z: 4}
    S.maybeToEither ('Expecting an integer') (S.parseInt (10) ('xyz'))
    //Left ('Expecting an integer')
    S.maybeToEither ('Expecting an integer') (S.parseInt (10) ('42'))
    //Right (42)
    S.Left ('Cannot divide by zero')
    //Left ('Cannot divide by zero')
    S.Right (42)
    //Right (42)
    S.isLeft (S.Left ('Cannot divide by zero'))
    //true
    S.isLeft (S.Right (42))
    //false
    S.isRight (S.Right (42))
    //true
    S.isRight (S.Left ('Cannot divide by zero'))
    //false
    S.fromEither (0) (S.Right (42))
    //42
    S.fromEither (0) (S.Left (42))
    //0
    S.either (S.toUpper) (S.show) (S.Left ('Cannot divide by zero'))
    //'CANNOT DIVIDE BY ZERO'
    S.either (S.toUpper) (S.show) (S.Right (42))
    //'42'
    S.lefts ([S.Right (20), S.Left ('foo'), S.Right (10), S.Left ('bar')])
    //['foo', 'bar']
    S.rights ([S.Right (20), S.Left ('foo'), S.Right (10), S.Left ('bar')])
    //[20, 10]
    S.tagBy (S.odd) (0)
    //Left (0)
    S.tagBy (S.odd) (1)
    //Right (1)
    S.encase (JSON.parse) ('["foo","bar","baz"]')
    //Right (['foo', 'bar', 'baz'])
    S.encase (JSON.parse) ('[')
    //Left (new SyntaxError ('Unexpected end of JSON input'))
    S.eitherToMaybe (S.Left ('Cannot divide by zero'))
    //Nothing
    S.eitherToMaybe (S.Right (42))
    //Just (42)
    S.and (false) (false)
    //false
    S.and (false) (true)
    //false
    S.and (true) (false)
    //false
    S.and (true) (true)
    //true
    S.or (false) (false)
    //false
    S.or (false) (true)
    //true
    S.or (true) (false)
    //true
    S.or (true) (true)
    //true
    S.not (false)
    //true
    S.not (true)
    //false
    Number.isInteger (42)
    //true
    S.complement (Number.isInteger) (42)
    //false
    S.boolean ('no') ('yes') (false)
    //'no'
    S.boolean ('no') ('yes') (true)
    //'yes'
    S.ifElse (x => x < 0) (Math.abs) (Math.sqrt) (-1)
    //1
    S.ifElse (x => x < 0) (Math.abs) (Math.sqrt) (16)
    //4
    S.when (x => x >= 0) (Math.sqrt) (16)
    //4
    S.when (x => x >= 0) (Math.sqrt) (-1)
    //-1
    S.unless (x => x < 0) (Math.sqrt) (16)
    //4
    S.unless (x => x < 0) (Math.sqrt) (-1)
    //-1
    S.array (S.Nothing) (head => tail => S.Just (head)) ([])
    //Nothing
    S.array (S.Nothing) (head => tail => S.Just (head)) ([1, 2, 3])
    //Just (1)
    S.array (S.Nothing) (head => tail => S.Just (tail)) ([])
    //Nothing
    S.array (S.Nothing) (head => tail => S.Just (tail)) ([1, 2, 3])
    //Just ([2, 3])
    S.head ([1, 2, 3])
    //Just (1)
    S.head ([])
    //Nothing
    S.head (Cons (1) (Cons (2) (Cons (3) (Nil))))
    //Just (1)
    S.head (Nil)
    //Nothing
    S.last ([1, 2, 3])
    //Just (3)
    S.last ([])
    //Nothing
    S.last (Cons (1) (Cons (2) (Cons (3) (Nil))))
    //Just (3)
    S.last (Nil)
    //Nothing
    S.tail ([1, 2, 3])
    //Just ([2, 3])
    S.tail ([])
    //Nothing
    S.tail (Cons (1) (Cons (2) (Cons (3) (Nil))))
    //Just (Cons (2) (Cons (3) (Nil)))
    S.tail (Nil)
    //Nothing
    S.init ([1, 2, 3])
    //Just ([1, 2])
    S.init ([])
    //Nothing
    S.init (Cons (1) (Cons (2) (Cons (3) (Nil))))
    //Just (Cons (1) (Cons (2) (Nil)))
    S.init (Nil)
    //Nothing
    S.take (0) (['foo', 'bar'])
    //Just ([])
    S.take (1) (['foo', 'bar'])
    //Just (['foo'])
    S.take (2) (['foo', 'bar'])
    //Just (['foo', 'bar'])
    S.take (3) (['foo', 'bar'])
    //Nothing
    S.take (3) (Cons (1) (Cons (2) (Cons (3) (Cons (4) (Cons (5) (Nil))))))
    //Just (Cons (1) (Cons (2) (Cons (3) (Nil))))
    S.drop (0) (['foo', 'bar'])
    //Just (['foo', 'bar'])
    S.drop (1) (['foo', 'bar'])
    //Just (['bar'])
    S.drop (2) (['foo', 'bar'])
    //Just ([])
    S.drop (3) (['foo', 'bar'])
    //Nothing
    S.drop (3) (Cons (1) (Cons (2) (Cons (3) (Cons (4) (Cons (5) (Nil))))))
    //Just (Cons (4) (Cons (5) (Nil)))
    S.takeLast (0) (['foo', 'bar'])
    //Just ([])
    S.takeLast (1) (['foo', 'bar'])
    //Just (['bar'])
    S.takeLast (2) (['foo', 'bar'])
    //Just (['foo', 'bar'])
    S.takeLast (3) (['foo', 'bar'])
    //Nothing
    S.takeLast (3) (Cons (1) (Cons (2) (Cons (3) (Cons (4) (Nil)))))
    //Just (Cons (2) (Cons (3) (Cons (4) (Nil))))
    S.dropLast (0) (['foo', 'bar'])
    //Just (['foo', 'bar'])
    S.dropLast (1) (['foo', 'bar'])
    //Just (['foo'])
    S.dropLast (2) (['foo', 'bar'])
    //Just ([])
    S.dropLast (3) (['foo', 'bar'])
    //Nothing
    S.dropLast (3) (Cons (1) (Cons (2) (Cons (3) (Cons (4) (Nil)))))
    //Just (Cons (1) (Nil))
    S.takeWhile (S.odd) ([3, 3, 3, 7, 6, 3, 5, 4])
    //[3, 3, 3, 7]
    S.takeWhile (S.even) ([3, 3, 3, 7, 6, 3, 5, 4])
    //[]
    S.dropWhile (S.odd) ([3, 3, 3, 7, 6, 3, 5, 4])
    //[6, 3, 5, 4]
    S.dropWhile (S.even) ([3, 3, 3, 7, 6, 3, 5, 4])
    //[3, 3, 3, 7, 6, 3, 5, 4]
    S.size ([])
    //0
    S.size (['foo', 'bar', 'baz'])
    //3
    S.size (Nil)
    //0
    S.size (Cons ('foo') (Cons ('bar') (Cons ('baz') (Nil))))
    //3
    S.size (S.Nothing)
    //0
    S.size (S.Just ('quux'))
    //1
    S.size (S.Pair ('ignored!') ('counted!'))
    //1
    S.all (S.odd) ([])
    //true
    S.all (S.odd) ([1, 3, 5])
    //true
    S.all (S.odd) ([1, 2, 3])
    //false
    S.any (S.odd) ([])
    //false
    S.any (S.odd) ([2, 4, 6])
    //false
    S.any (S.odd) ([1, 2, 3])
    //true
    S.none (S.odd) ([])
    //true
    S.none (S.odd) ([2, 4, 6])
    //true
    S.none (S.odd) ([1, 2, 3])
    //false
    S.append (3) ([1, 2])
    //[1, 2, 3]
    S.append (3) (Cons (1) (Cons (2) (Nil)))
    //Cons (1) (Cons (2) (Cons (3) (Nil)))
    S.append ([1]) (S.Nothing)
    //Just ([1])
    S.append ([3]) (S.Just ([1, 2]))
    //Just ([1, 2, 3])
    S.prepend (1) ([2, 3])
    //[1, 2, 3]
    S.prepend (1) (Cons (2) (Cons (3) (Nil)))
    //Cons (1) (Cons (2) (Cons (3) (Nil)))
    S.prepend ([1]) (S.Nothing)
    //Just ([1])
    S.prepend ([1]) (S.Just ([2, 3]))
    //Just ([1, 2, 3])
    S.joinWith (':') (['foo', 'bar', 'baz'])
    //'foo:bar:baz'
    S.elem ('c') (['a', 'b', 'c'])
    //true
    S.elem ('x') (['a', 'b', 'c'])
    //false
    S.elem (3) ({x: 1, y: 2, z: 3})
    //true
    S.elem (8) ({x: 1, y: 2, z: 3})
    //false
    S.elem (0) (S.Just (0))
    //true
    S.elem (0) (S.Just (1))
    //false
    S.elem (0) (S.Nothing)
    //false
    S.find (S.lt (0)) ([1, -2, 3, -4, 5])
    //Just (-2)
    S.find (S.lt (0)) ([1, 2, 3, 4, 5])
    //Nothing
    S.foldMap (String) (f => f.name) ([Math.sin, Math.cos, Math.tan])
    //'sincostan'
    S.foldMap (Array) (x => [x + 1, x + 2]) ([10, 20, 30])
    //[11, 12, 21, 22, 31, 32]
    S.unfoldr (n => n < 1000 ? S.Just (S.Pair (n) (2 * n)) : S.Nothing) (1)
    //[1, 2, 4, 8, 16, 32, 64, 128, 256, 512]
    S.range (0) (10)
    //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    S.range (-5) (0)
    //[-5, -4, -3, -2, -1]
    S.range (0) (-5)
    //[]
    S.groupBy (S.equals) ([1, 1, 2, 1, 1])
    //[[1, 1], [2], [1, 1]]
    S.groupBy (x => y => x + y === 0) ([2, -3, 3, 3, 3, 4, -4, 4])
    //[[2], [-3, 3, 3, 3], [4, -4], [4]]
    S.reverse ([1, 2, 3])
    //[3, 2, 1]
    S.reverse (Cons (1) (Cons (2) (Cons (3) (Nil))))
    //Cons (3) (Cons (2) (Cons (1) (Nil)))
    S.pipe ([S.splitOn (''), S.reverse, S.joinWith ('')]) ('abc')
    //'cba'
    S.sort (['foo', 'bar', 'baz'])
    //['bar', 'baz', 'foo']
    S.sort ([S.Left (4), S.Right (3), S.Left (2), S.Right (1)])
    //[Left (2), Left (4), Right (1), Right (3)]
    S.sortBy (S.prop ('rank')) ([
    {rank: 7, suit: 'spades'},
    {rank: 5, suit: 'hearts'},
    {rank: 2, suit: 'hearts'},
    {rank: 5, suit: 'spades'},
    ])

    [ {rank: 2, suit: 'hearts'},
    {rank: 5, suit: 'hearts'},
    {rank: 5, suit: 'spades'},
    {rank: 7, suit: 'spades'} ]

    S.sortBy (S.prop ('suit')) ([
    {rank: 7, suit: 'spades'},
    {rank: 5, suit: 'hearts'},
    {rank: 2, suit: 'hearts'},
    {rank: 5, suit: 'spades'},
    ])

    [ {rank: 5, suit: 'hearts'},
    {rank: 2, suit: 'hearts'},
    {rank: 7, suit: 'spades'},
    {rank: 5, suit: 'spades'} ]

    S.sortBy (Descending) ([83, 97, 110, 99, 116, 117, 97, 114, 121])
    //[121, 117, 116, 114, 110, 99, 97, 97, 83]
    S.zip (['a', 'b']) (['x', 'y', 'z'])
    //[Pair ('a') ('x'), Pair ('b') ('y')]
    S.zip ([1, 3, 5]) ([2, 4])
    //[Pair (1) (2), Pair (3) (4)]
    S.zipWith (a => b => a + b) (['a', 'b']) (['x', 'y', 'z'])
    //['ax', 'by']
    S.zipWith (a => b => [a, b]) ([1, 3, 5]) ([2, 4])
    //[[1, 2], [3, 4]]
    S.prop ('a') ({a: 1, b: 2})
    //1
    S.props (['a', 'b', 'c']) ({a: {b: {c: 1}}})
    //1
    S.get (S.is ($.Number)) ('x') ({x: 1, y: 2})
    //Just (1)
    S.get (S.is ($.Number)) ('x') ({x: '1', y: '2'})
    //Nothing
    S.get (S.is ($.Number)) ('x') ({})
    //Nothing
    S.get (S.is ($.Array ($.Number))) ('x') ({x: [1, 2, 3]})
    //Just ([1, 2, 3])
    S.get (S.is ($.Array ($.Number))) ('x') ({x: [1, 2, 3, null]})
    //Nothing
    S.gets (S.is ($.Number)) (['a', 'b', 'c']) ({a: {b: {c: 42}}})
    //Just (42)
    S.gets (S.is ($.Number)) (['a', 'b', 'c']) ({a: {b: {c: '42'}}})
    //Nothing
    S.gets (S.is ($.Number)) (['a', 'b', 'c']) ({})
    //Nothing
    S.value ('foo') ({foo: 1, bar: 2})
    //Just (1)
    S.value ('bar') ({foo: 1, bar: 2})
    //Just (2)
    S.value ('baz') ({foo: 1, bar: 2})
    //Nothing
    S.singleton ('foo') (42)
    //{foo: 42}
    S.insert ('c') (3) ({a: 1, b: 2})
    //{a: 1, b: 2, c: 3}
    S.insert ('a') (4) ({a: 1, b: 2})
    //{a: 4, b: 2}
    S.remove ('c') ({a: 1, b: 2, c: 3})
    //{a: 1, b: 2}
    S.remove ('c') ({})
    //{}
    S.sort (S.keys ({b: 2, c: 3, a: 1}))
    //['a', 'b', 'c']
    S.sort (S.values ({a: 1, c: 3, b: 2}))
    //[1, 2, 3]
    S.sort (S.pairs ({b: 2, a: 1, c: 3}))
    //[Pair ('a') (1), Pair ('b') (2), Pair ('c') (3)]
    S.fromPairs ([S.Pair ('a') (1), S.Pair ('b') (2), S.Pair ('c') (3)])
    //{a: 1, b: 2, c: 3}
    S.fromPairs ([S.Pair ('x') (1), S.Pair ('x') (2)])
    //{x: 2}
    S.negate (12.5)
    //-12.5
    S.negate (-42)
    //42
    S.add (1) (1)
    //2
    S.sum ([1, 2, 3, 4, 5])
    //15
    S.sum ([])
    //0
    S.sum (S.Just (42))
    //42
    S.sum (S.Nothing)
    //0
    S.map (S.sub (1)) ([1, 2, 3])
    //[0, 1, 2]
    S.mult (4) (2)
    //8
    S.product ([1, 2, 3, 4, 5])
    //120
    S.product ([])
    //1
    S.product (S.Just (42))
    //42
    S.product (S.Nothing)
    //1
    S.map (S.div (2)) ([0, 1, 2, 3])
    //[0, 0.5, 1, 1.5]
    S.map (S.pow (2)) ([-3, -2, -1, 0, 1, 2, 3])
    //[9, 4, 1, 0, 1, 4, 9]
    S.map (S.pow (0.5)) ([1, 4, 9, 16, 25])
    //[1, 2, 3, 4, 5]
    S.mean ([1, 2, 3, 4, 5])
    //Just (3)
    S.mean ([])
    //Nothing
    S.mean (S.Just (42))
    //Just (42)
    S.mean (S.Nothing)
    //Nothing
    S.even (42)
    //true
    S.even (99)
    //false
    S.odd (99)
    //true
    S.odd (42)
    //false
    S.parseDate ('2011-01-19T17:40:00Z')
    //Just (new Date ('2011-01-19T17:40:00.000Z'))
    S.parseDate ('today')
    //Nothing
    S.parseFloat ('-123.45')
    //Just (-123.45)
    S.parseFloat ('foo.bar')
    //Nothing
    S.parseInt (10) ('-42')
    //Just (-42)
    S.parseInt (16) ('0xFF')
    //Just (255)
    S.parseInt (16) ('0xGG')
    //Nothing
    S.parseJson (S.is ($.Array ($.Integer))) ('[')
    //Nothing
    S.parseJson (S.is ($.Array ($.Integer))) ('["1","2","3"]')
    //Nothing
    S.parseJson (S.is ($.Array ($.Integer))) ('[0,1.5,3,4.5]')
    //Nothing
    S.parseJson (S.is ($.Array ($.Integer))) ('[1,2,3]')
    //Just ([1, 2, 3])
    S.regex ('g') (':\\d+:')
    ///:\d+:/g
    S.regexEscape ('-=*{XYZ}*=-')
    //'\\-=\\*\\{XYZ\\}\\*=\\-'
    S.test (/^a/) ('abacus')
    //true
    S.test (/^a/) ('banana')
    //false
    S.match (/(good)?bye/) ('goodbye')
    //Just ({match: 'goodbye', groups: [Just ('good')]})
    S.match (/(good)?bye/) ('bye')
    //Just ({match: 'bye', groups: [Nothing]})
    S.matchAll (/@([a-z]+)/g) ('Hello, world!')
    //[]
    S.matchAll (/@([a-z]+)/g) ('Hello, @foo! Hello, @bar! Hello, @baz!')
    [
        {match: '@foo', groups: [Just ('foo')]},
        {match: '@bar', groups: [Just ('bar')]},
        {match: '@baz', groups: [Just ('baz')]}
    ]
    S.toUpper ('ABC def 123')
    //'ABC DEF 123'
    S.toLower ('ABC def 123')
    //'abc def 123'
    S.trim ('\t\t foo bar \n')
    //'foo bar'
    S.stripPrefix ('https://') ('https://sanctuary.js.org')
    //Just ('sanctuary.js.org')
    S.stripPrefix ('https://') ('http://sanctuary.js.org')
    //Nothing
    S.stripSuffix ('.md') ('README.md')
    //Just ('README')
    S.stripSuffix ('.md') ('README')
    //Nothing
    S.words (' foo bar baz ')
    //['foo', 'bar', 'baz']
    S.unwords (['foo', 'bar', 'baz'])
    //'foo bar baz'
    S.lines ('foo\nbar\nbaz\n')
    //['foo', 'bar', 'baz']
    S.unlines (['foo', 'bar', 'baz'])
    //'foo\nbar\nbaz\n'
    S.splitOn ('::') ('foo::bar::baz')
    //['foo', 'bar', 'baz']
    S.splitOnRegex (/[,;][ ]*/g) ('foo, bar, baz')
    //['foo', 'bar', 'baz']
    S.splitOnRegex (/[,;][ ]*/g) ('foo;bar;baz')
    //['foo', 'bar', 'baz']

}



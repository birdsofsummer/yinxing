const joi=Joi=require("@hapi/joi")

test=()=>{
      s='ccc'
      s1="ddd"

      d1=5
      d2="5"
      d3="c".repeat(12)

      reg1=/^5$/
      reg2=/.{12}/

      Joi.compile(reg1).validate(d1)
      Joi.compile(reg1).validate(d2)
      Joi.compile(reg2).validate(d3)

      r=Joi.valid(s).validate(s1)
      r=Joi.date().validate(s)



      messages = {
        zh: {
            root: 'xxx字段',
            'number.min': '{#label}太小了...'
        },
        latin: {
            root: 'valorem',
            'number.min': Joi.x('{@label} angustus', { prefix: { local: '@' } })
        }
     };

      schema=Joi.number().min(10).message(messages)
      r=schema.validate(1, { errors: { language: 'zh' } })
      r=schema.validate(1, { errors: { language: 'latin' } })



      z=Joi.string()
      r=z.valid(s1).validate(s)
      r=z.required().validate(s)
      r=z.alphanum().validate(s)
      r=z.base().validate(s)
      r=z.base64().validate(s)
      r=z.creditCard().validate(s)
      r=z.dataUri().validate(s)
      r=z.domain().validate(s)
      r=z.email().validate(s)
      r=z.empty().validate(s)
      r=z.guid().validate(s)
      r=z.hex().validate(s)
      r=z.hexAlign().validate(s)
      r=z.hostname().validate(s)
      r=z.ip().validate(s)
      r=z.ipVersion().validate(s)
      r=z.isoDate().validate(s)
      r=z.isoDuration().validate(s)
      r=z.length().validate(s)
      r=z.lowercase().validate(s)
      r=z.max(1).validate(s)
      r=z.min(1).validate(s)
      r=z.normalize().validate(s)
      r=z.token().validate(s)
      r=z.pattern.base().validate(s)
      r=z.pattern.name().validate(s)
      r=z.pattern.invert.base().validate(s)
      r=z.pattern.invert.name().validate(s)
      r=z.trim().validate(s)
      r=z.uri().validate(s)
      r=z.uriCustomScheme().validate(s)
      r=z.uriRelativeOnly().validate(s)
      r=z.uppercase().validate(s)


      n=Joi.number()

      s=12
      s1=10

      r=n.integer().validate(s)
      r=n.greater(s1).validate(s)
      r=n.less(s1).validate(s)
      r=n.max(s1).validate(s)
      r=n.min(s1).validate(s)
      r=n.multiple().validate(s)
      r=n.negative().validate(s)
      r=n.port().validate(s)
      r=n.positive().validate(s)
      r=n.precision().validate(s)
      r=n.sign().validate(s)
      r=n.unsafe().validate(s)

      s='2020-01-01'
      s1="2021-01-01"

      d=Joi.date()

      r=d.validate(s)
      d.base().validate(s)

      d.format('unix').validate(s)
      d.format('iso').validate(s)
      d.format('javascript').validate(s)

      d.format.iso().validate(s)
      d.format.javascript().validate(s)
      d.format.unix().validate(s)

      d.greater(s1).validate(s)
      d.less(s1).validate(s)
      d.max(s1).validate(s)
      d.min(s1).validate(s)



    user={
          name: Joi.string().required(),
          age: Joi.number().min(10),
          x:Joi.number(),
          x1: Joi.number().required(),
          x2: Joi.string().required(),
          x3: Joi.boolean().required(),
          x4: Joi.array().items(
                  Joi.array().items({
                      x: Joi.number()
                  })
              ),
         x5: Joi.array().items(
             Joi.array().items(
                 Joi.object({ x: Joi.string() }
                 ).forbidden()
             )
         ),
        detail:Joi.object({
            favorite: Joi.array().items({
                rank: Joi.number(),
                name: Joi.string().required(),
            }),
        }),
        follow:Joi.alternatives(Joi.number(), Joi.string()),
        ccc:Joi.object({
            x: Joi.object({
                y: Joi.object({
                    z: Joi.valid('z'),
                    a: Joi.array().items(Joi.string())
                })
            })
        }),
        ddd:Joi.object({
                a: Joi.string().valid('a', 'b', 'c', 'd'),
                y: Joi.object({
                    u: Joi.string().valid('e', 'f', 'g', 'h').required(),
                    b: Joi.string().valid('i', 'j').allow(false),
                    d: Joi.object({
                        x: Joi.string().valid('k', 'l').required(),
                        c: Joi.number()
                    })
                })
         }),
        eee:Joi.array().items(Joi.valid(1, 2)), //[1,2]
        fff:Joi.array().items(Joi.number().min(4).max(20)), //[4..20]
        g:Joi.array().items(Joi.number()),
        h:Joi.array().items(Joi.number().min(4).max(28)),
        i:[ Joi.string(), Joi.number(), Joi.date() ],
        j:Joi.object({
                x: Joi.object({
                    y: Joi.object({
                        z: Joi.number()
                    })
                })
            }),
        date:Joi.object({
                    y: Joi.date().allow(null),
                    z: Joi.date().allow(null),
                    u: Joi.date().allow(null),
                    g: Joi.date().allow(null),
                    h: Joi.date().allow(null),
                    i: Joi.date().allow(null),
                    k: Joi.date().allow(null),
                    p: Joi.date().allow(null),
                    f: Joi.date().allow(null)
        }),
        response:Joi.object({
                    modify: Joi.boolean(),
                    options: Joi.object()
        }),
        s:Joi.object({ type: 'ccc' }).unknown(),

    }


    u={
        name:"ccc",
        age:12,
        x:123,
        x1:"10",
        x2:"ss",
        x3:"true",
        x4: [
            [{ x: 1 }],
            [{ x: 1 }, { x: '10' }]
        ],
        x5:[
            [{ x: 1 }],
            [{ x: 1 }, { x: 10 }]
        ],
        detail:{
            favorite: [
                {name:"dd", rank: 1 },
                {name:"ccc", rank: '10' }
            ],
        },
  //      follow:[ [1,"ccc"], ],
        ccc:{x:{y:{
            z:"z",
            a:["d","dd"]
        }}},
        ddd:{
                a: 'c',
                y: {
                    u:"e",
                    b: false ,// ["i", "j" ,false]
                    d:{
                        x:"k",
                        c:10,
                    }
                }
            },
        eee:[1,2],
        fff:[4,19,20],
        g:[1,"1"],
        h:[],
        i:"2020-01-01",
        j:{x:{y:{z:10}}},
        date:{
             //       y: NaN,
             //       z: Infinity,
             //       u: -Infinity,
             //       g: Symbol('foo'),
             //       h: -Infinity,
             //       i: Infinity,
             //       k: (a) => a,
             //       p: Symbol('bar'),
             //       f: (x)=>[{y:2}]
        },
        response: {
            modify: true,
            options: { stripUnknown: true }
        },
        s:{},


    }


    r=Joi.object(user).validate(u)
    u1=r.value
    console.log(u)
    console.log(u1)

}


//https://github.com/hapijs/joi/blob/master/test/errors.js
/*
Joi.ValidationError()
Joi._types()
Joi.allow()
Joi.alt()
Joi.alternatives()
Joi.any()
Joi.array()
Joi.assert()
Joi.attempt()
Joi.binary()
Joi.bool()
Joi.boolean()
Joi.build()
Joi.cache()
Joi.checkPreferences()
Joi.compile()
Joi.custom()
Joi.date()
Joi.defaults()
Joi.disallow()
Joi.equal()
Joi.exist()
Joi.expression()
Joi.extend()
Joi.forbidden()
Joi.func()
Joi.function()
Joi.in()
Joi.invalid()
Joi.isExpression()
Joi.isRef()
Joi.isSchema()
Joi.link()
Joi.not()
Joi.number()
Joi.object()
Joi.only()
Joi.optional()
Joi.options()
Joi.override()
Joi.preferences()
Joi.prefs()
Joi.ref()
Joi.required()
Joi.string()
Joi.strip()
Joi.symbol()
Joi.trace()
Joi.types()
Joi.untrace()
Joi.valid()
Joi.version()
Joi.when()
Joi.x()
*/




a=require('./ctx')

c=a.create_ctx()
c.append('token','12345')
c.message="ddd"
c.json({x:1})
c.str({x:1})

c.status

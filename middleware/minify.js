const minify = require('html-minifier');

app.use(async (ctx, next) => {
      await next();
      if (!ctx.response.is('html')) return;
      let body = ctx.body;
      if (!body || body.pipe) return;
      if (Buffer.isBuffer(body)) body = body.toString();
      ctx.body = minify(body);
});

const Joi = require('@hapi/joi')

const usagePlanScheme = {
    usagePlanId: Joi.string().optional(),
    usagePlanDesc: Joi.string()
      .max(200)
      .optional(),
    // -1 disable quota
    maxRequestNum: Joi.number()
      .integer()
      .min(1)
      .max(99999999)
      .optional()
      .default(-1),
    maxRequestNumPreSec: Joi.number()
      .integer()
      .min(1)
      .max(2000)
      .optional()
      .default(1000),
    usagePlanName: Joi.string()
      .min(2)
      .max(50)
      .required()
      .error(new Error('"usagePlan.usagePlanName" is required'))
  }

const endpointsScheme = Joi.array()
    .max(100)
    .items(
      Joi.object().keys({
        apiId: Joi.string().optional(),
        description: Joi.string()
          .max(200)
          .optional(),
        enableCORS: Joi.boolean()
          .optional()
          .default(false),
        path: Joi.string().required(),
        method: Joi.string()
          .regex(/^(GET|POST|PUT|DELETE|HEAD|ANY)$/)
          .required(),
        function: Joi.object()
          .keys({
            isIntegratedResponse: Joi.boolean()
              .optional()
              .default(false),
            functionQualifier: Joi.string()
              .optional()
              .default('$LATEST'),
            functionName: Joi.string()
              .required()
              .error(new Error('"endpoints.function.functionName" is required'))
          })
          .required(),
        usagePlan: Joi.object().keys(usagePlanScheme),
        auth: {
          serviceTimeout: Joi.number()
            .integer()
            .optional()
            .default(15),
          secretName: Joi.string().required(),
          // Api returns a maximum of 100 rows of records at a time
          // https://cloud.tencent.com/document/product/628/14920
          secretIds: Joi.array().max(100)
        }
      })
    )
    .required()


const globalScheme = Joi.object()
    .keys({
      region: Joi.string()
        .optional()
        .default('ap-guangzhou'),
      serviceId: Joi.string().optional(),
      protocols: Joi.array()
        .items(Joi.string().regex(/^(http|https)$/))
        .optional()
        .default(['http']),
      serviceName: Joi.string()
        .min(2)
        .max(50)
        .required()
        .error(new Error('"serviceName" is required')),
      description: Joi.string()
        .max(200)
        .optional(),
      environment: Joi.string()
        .regex(/^(prepub|test|release)$/)
        .optional()
        .default('release'),
      endpoints: endpointsScheme
      // usagePlan: Joi.object().keys(usagePlanScheme)
    })
    .options({ allowUnknown: true })

const validate=(config={})=>Joi.validate(config, globalScheme)


module.exports={
    usagePlanScheme,
    endpointsScheme,
    globalScheme,
    validate,
}


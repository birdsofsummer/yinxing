// https://www.npmjs.com/package/validator

var validator = require('validator')
const R=require('ramda')
const {
    blacklist,
    contains,
    equals,
    escape,
    isAfter,
    isAlpha,
    isAlphaLocales,
    isAlphanumeric,
    isAlphanumericLocales,
    isAscii,
    isBIC,
    isBase32,
    isBase64,
    isBefore,
    isBoolean,
    isByteLength,
    isCreditCard,
    isCurrency,
    isDataURI,
    isDecimal,
    isDivisibleBy,
    isEmail,
    isEmpty,
    isFQDN,
    isFloat,
    isFloatLocales,
    isFullWidth,
    isHalfWidth,
    isHash,
    isHexColor,
    isHexadecimal,
    isIP,
    isIPRange,
    isISBN,
    isISIN,
    isISO31661Alpha2,
    isISO31661Alpha3,
    isISO8601,
    isISRC,
    isISSN,
    isIdentityCard,
    isIn,
    isInt,
    isJSON,
    isJWT,
    isLatLong,
    isLength,
    isLowercase,
    isMACAddress,
    isMD5,
    isMagnetURI,
    isMimeType,
    isMobilePhone,
    isMobilePhoneLocales,
    isMongoId,
    isMultibyte,
    isNumeric,
    isOctal,
    isPort,
    isPostalCode,
    isPostalCodeLocales,
    isRFC3339,
    isSlug,
    isSurrogatePair,
    isURL,
    isUUID,
    isUppercase,
    isVariableWidth,
    isWhitelisted,
    ltrim,
    matches,
    normalizeEmail,
    rtrim,
    stripLow,
    toBoolean,
    toDate,
    toFloat,
    toInt,
    //toString,
    trim,
    unescape,
    version,
    whitelist
} =validator

const {ValidateFactory}=require('./index')
const {
    is_s,
    is_in_length_range,
    is_n,
    is_in_range,
    is_in_enum,
}=require("../fp/rule")

test=()=>{
    let USER={
        name:"ccc",
        age:3,
        gender:1,
        type:2
    }
    USER_VALIDATOR={
        name:[is_in_length_range([3,100])],
        age:[is_in_range([0,100])],
        type:[is_in_enum([0,1,2])],
        gender:[is_in_enum([0,1])],
    }
    me=ValidateFactory({name:"nn1"},USER,USER_VALIDATOR)
    me.update("name","n213")
    me.update("age",12)
    me.update("age",112) // error
    me.update("gender",0)
    console.log(me.json())
    me.update("gender",10)
    console.log(me.json())
}


test1=()=>{
    let a=Object.getOwnPropertyDescriptor('foo', 0);
    //{ value: 'f', writable: false, enumerable: true, configurable: false }
}


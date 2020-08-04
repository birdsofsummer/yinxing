/*

//https://sequelize.org/master/
//https://sequelize.org/master/manual/models-usage.html

const {
    ABSTRACT,
    ARRAY,
    AccessDeniedError,
    Association,
    AssociationError,
    BIGINT,
    BLOB,
    BOOLEAN,
    BaseError,
    BulkRecordError,
    CHAR,
    CIDR,
    CITEXT,
    ConnectionAcquireTimeoutError,
    ConnectionError,
    ConnectionRefusedError,
    ConnectionTimedOutError,
    DATE,
    DATEONLY,
    DECIMAL,
    DOUBLE,
    DOUBLE PRECISION,
    DataTypes,
    DatabaseError,
    Deferrable,
    ENUM,
    EagerLoadingError,
    EmptyResultError,
    Error,
    ExclusionConstraintError,
    FLOAT,
    ForeignKeyConstraintError,
    GEOGRAPHY,
    GEOMETRY,
    HSTORE,
    HostNotFoundError,
    HostNotReachableError,
    INET,
    INTEGER,
    IndexHints,
    InstanceError,
    InvalidConnectionError,
    JSON,
    JSONB,
    MACADDR,
    MEDIUMINT,
    Model,
    NOW,
    NUMBER,
    NUMERIC,
    Op,
    OptimisticLockError,
    Promise,
    QueryError,
    QueryTypes,
    RANGE,
    REAL,
    SMALLINT,
    STRING,
    Sequelize,
    SequelizeScopeError,
    TEXT,
    TIME,
    TINYINT,
    TableHints,
    TimeoutError,
    Transaction,
    UUID,
    UUIDV1,
    UUIDV4,
    UniqueConstraintError,
    UnknownConstraintError,
    Utils,
    VIRTUAL,
    ValidationError,
    ValidationErrorItem,
    Validator,
    _setupHooks,
    addHook,
    afterAssociate,
    afterBulkCreate,
    afterBulkDestroy,
    afterBulkRestore,
    afterBulkSync,
    afterBulkUpdate,
    afterConnect,
    afterCreate,
    afterDefine,
    afterDestroy,
    afterDisconnect,
    afterFind,
    afterInit,
    afterQuery,
    afterRestore,
    afterSave,
    afterSync,
    afterUpdate,
    afterUpsert,
    afterValidate,
    beforeAssociate,
    beforeBulkCreate,
    beforeBulkDestroy,
    beforeBulkRestore,
    beforeBulkSync,
    beforeBulkUpdate,
    beforeConnect,
    beforeCount,
    beforeCreate,
    beforeDefine,
    beforeDestroy,
    beforeDisconnect,
    beforeFind,
    beforeFindAfterExpandIncludeAll,
    beforeFindAfterOptions,
    beforeInit,
    beforeQuery,
    beforeRestore,
    beforeSave,
    beforeSync,
    beforeUpdate,
    beforeUpsert,
    beforeValidate,
//    default,
    hasHook,
    hasHooks,
    mariadb,
    mssql,
    mysql,
    options,
    postgres,
    removeHook,
    runHooks,
    sqlite,
    useInflection,
    validationFailed,
    version
}=require('sequelize')
*/


const { Sequelize, Model, DataTypes,Op } = require('sequelize');
const R=require('ramda')

const join_arr=(sep="|")=>(kk=[])=>xx=>kk.forEach( y=>xx.dataValues[y]=xx.dataValues[y].join(sep))

const {
    adjacent,
    all,
    and,
    any,
    between,
    col,
    contained,
    contains,
    endsWith,
    eq,
    gt,
    gte,
    iLike,
    iRegexp,
    //in,
    is,
    join,
    like,
    lt,
    lte,
    ne,
    noExtendLeft,
    noExtendRight,
    not,
    notBetween,
    notILike,
    notIRegexp,
    notIn,
    notLike,
    notRegexp,
    or,
    overlap,
    placeholder,
    regexp,
    startsWith,
    strictLeft,
    strictRight,
    substring,
    values
}=Op



const {
    ABSTRACT,
    STRING,
    CHAR,
    TEXT,
    NUMBER,
    TINYINT,
    SMALLINT,
    MEDIUMINT,
    INTEGER,
    BIGINT,
    FLOAT,
    TIME,
    DATE,
    DATEONLY,
    BOOLEAN,
    NOW,
    BLOB,
    DECIMAL,
    NUMERIC,
    UUID,
    UUIDV1,
    UUIDV4,
    HSTORE,
    //JSON,
    JSONB,
    VIRTUAL,
    ARRAY,
    ENUM,
    RANGE,
    REAL,
    //DOUBLE PRECISION,
    DOUBLE,
    GEOMETRY,
    GEOGRAPHY,
    CIDR,
    INET,
    MACADDR,
    CITEXT,
    postgres,
    mysql,
    mariadb,
    sqlite,
    mssql,
}=DataTypes

// --------------------------------------------------------------------------------
//new Sequelize('sqlite::memory:')
conn=(path='./test.sqlite')=>{
    o={
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
    return new Sequelize( {
          dialect: 'sqlite',
          storage: path,
    })
}

module.exports={
    conn,
    join_arr,
}






// --------------------------------------------------------------------------------
test1=async ()=>{
    sequelize = conn()
    m={
      username: STRING,
      birthday: DATE,
      job: STRING,
    }
    d={
            username: 'ccc',
            birthday: new Date(1980, 6, 20),
            job:"ccc",
    }
    table="user"
    class User extends Model {}

    sequelize =conn()
    User.init(m, { sequelize, modelName: table })
    await sequelize.sync()
    o={ where: { username: "ccc" } }
    d1={ username: "Doe" }

    r=await User.create(d)

    rn=await Promise.all(R.repeat(d,10).map(x=>User.create(x)))
    r1=await User.findAll()
    r2=User.destroy(o).then(console.log)// 1

    r3=await User.findAll() //[]
    r30 = await User.findByPk(123) //id=123 ? null

    r4=await User.create(d)
    r5=await User.update(o) //[1]
    r6=await User.findOne({where:{...d1}}) //null or user


    r7=await User.findOrCreate({
        where: {username: 'sdepold'},
        defaults: {job: 'Technical Lead JavaScript'}}
    )

    console.log(r)
    console.log(r1)
    console.log(r.toJSON())
}


test2=async ()=>{
    sequelize =conn()
    class u extends Model {}
    table="user"
    u.init(m, { sequelize, modelName: table })
    await sequelize.sync()

    const {
        hasMany,
        belongsToMany,
        getAssociations,
        getAssociationForAlias,
        hasOne,
        belongsTo
    }= u.Mixin

    o={
      where: {
        id: {
          [Op.and]: {a: 5},           // AND (a = 5)
          [Op.or]: [{a: 5}, {a: 6}],  // (a = 5 OR a = 6)
          [Op.gt]: 6,                // id > 6
          [Op.gte]: 6,               // id >= 6
          [Op.lt]: 10,               // id < 10
          [Op.lte]: 10,              // id <= 10
          [Op.ne]: 20,               // id != 20
          [Op.between]: [6, 10],     // BETWEEN 6 AND 10
          [Op.notBetween]: [11, 15], // NOT BETWEEN 11 AND 15
          [Op.in]: [1, 2],           // IN [1, 2]
          [Op.notIn]: [1, 2],        // NOT IN [1, 2]
          [Op.like]: '%hat',         // LIKE '%hat'
          [Op.notLike]: '%hat',       // NOT LIKE '%hat'
          [Op.iLike]: '%hat',         // ILIKE '%hat' (case insensitive)  (PG only)
          [Op.notILike]: '%hat',      // NOT ILIKE '%hat'  (PG only)
          [Op.overlap]: [1, 2],       // && [1, 2] (PG array overlap operator)
          [Op.contains]: [1, 2],      // @> [1, 2] (PG array contains operator)
          [Op.contained]: [1, 2],     // <@ [1, 2] (PG array contained by operator)
          [Op.any]: [2,3]            // ANY ARRAY[2, 3]::INTEGER (PG only)
        },
        status: {
          [Op.not]: false           // status NOT FALSE
        }
      }
    }

        o1={
          where: {
            name: 'a project',
            [Op.or]: [
              { id: [1,2,3] },
              { id: { [Op.gt]: 10 } }
            ]
          }
        }


        o2={
          where: {
            name: 'a project',
            [Op.not]: [
              { id: [1,2,3] },
              { array: { [Op.contains]: [3,4,5] } }
            ]
          }
        }

/*
SELECT *
FROM `Projects`
WHERE (
  `Projects`.`name` = 'a project'
   AND (`Projects`.`id` IN (1,2,3) OR `Projects`.`id` > 10)
)
LIMIT 1;
*/


//    u.QueryGenerator
//    u.QueryInterface

//    r=await u._addDefaultAttributes
//    r=await u._assignOptions
//    r=await u._baseMerge
//    r=await u._conformInclude
//    r=await u._conformIncludes
//    r=await u._conformIndex
//    r=await u._defaultsOptions
//    r=await u._expandAttributes
//    r=await u._expandIncludeAll
//    r=await u._expandIncludeAllElement
//    r=await u._findAutoIncrementAttribute
//    r=await u._findSeparate
//    r=await u._getDefaultTimestamp
//    r=await u._getIncludedAssociation
//    r=await u._injectDependentVirtualAttributes
//    r=await u._injectScope
//    r=await u._mergeFunction
//    r=await u._optionsMustContainWhere
//    r=await u._paranoidClause
//    r=await u._setupHooks
//    r=await u._transformStringAssociation
//    r=await u._uniqIncludes
//    r=await u._validateIncludedElement
//    r=await u._validateIncludedElements


    r=await u.addHook
    r=await u.addScope
    r=await u.afterAssociate
    r=await u.afterBulkCreate
    r=await u.afterBulkDestroy
    r=await u.afterBulkRestore
    r=await u.afterBulkSync
    r=await u.afterBulkUpdate
    r=await u.afterCreate
    r=await u.afterDestroy
    r=await u.afterFind
    r=await u.afterQuery
    r=await u.afterRestore
    r=await u.afterSave
    r=await u.afterSync
    r=await u.afterUpdate
    r=await u.afterUpsert
    r=await u.afterValidate
    r=await u.aggregate
    r=await u.beforeAssociate
    r=await u.beforeBulkCreate
    r=await u.beforeBulkDestroy
    r=await u.beforeBulkRestore
    r=await u.beforeBulkSync
    r=await u.beforeBulkUpdate
    r=await u.beforeCount
    r=await u.beforeCreate
    r=await u.beforeDestroy
    r=await u.beforeFind
    r=await u.beforeFindAfterExpandIncludeAll
    r=await u.beforeFindAfterOptions
    r=await u.beforeQuery
    r=await u.beforeRestore
    r=await u.beforeSave
    r=await u.beforeSync
    r=await u.beforeUpdate
    r=await u.beforeUpsert
    r=await u.beforeValidate
    r=await u.belongsTo
    r=await u.belongsToMany

    r=await u.build
    r=await u.bulkBuild
    r=await u.bulkCreate
    r=await u.count

    r=await u.create

    r=await u.decrement
    r=await u.default
    r=await u.describe

    r=await u.destroy
    r=await u.drop
    r=await u.dropSchema

    r=await u.findAll
    r=await u.findAndCountAll
    r=await u.findByPk
    r=await u.findOne
    r=await u.findOrBuild
    r=await u.findOrCreate
    r=await u.findCreateFind

    r=await u.getAssociationForAlias
    r=await u.getAssociations
    r=await u.getTableName
    r=await u.hasAlias
    r=await u.hasHook
    r=await u.hasHooks
    r=await u.hasMany
    r=await u.hasOne
    r=await u.increment
    r=await u.init
    r=await u.inspect
    r=await u.length
    r=await u.max
    r=await u.min
    r=await u.name
    r=await u.prototype
    r=await u.refreshAttributes
    r=await u.removeAttribute
    r=await u.removeHook
    r=await u.restore
    r=await u.runHooks
    r=await u.schema
    r=await u.scope
    r=await u.sum
    r=await u.sync
    r=await u.truncate
    r=await u.unscoped

    r=await u.update

    r=await u.upsert
    r=await u.validationFailed
    r=await u.warnOnInvalidOptions

}




const R=require('ramda')

const {
    conn,
    join_arr
}=require('./seq')
const {map_keys_by_dict}=require('../fp')

const {
//    ABSTRACT,
//    ARRAY,
//    AccessDeniedError,
//    Association,
//    AssociationError,
//    BIGINT,
//    BLOB,
//    BOOLEAN,
//    BaseError,
//    BulkRecordError,
//    CHAR,
//    CIDR,
//    CITEXT,
//    ConnectionAcquireTimeoutError,
//    ConnectionError,
//    ConnectionRefusedError,
//    ConnectionTimedOutError,
//    DATE,
//    DATEONLY,
//    DECIMAL,
//    DOUBLE,
//    DOUBLE PRECISION,
    DataTypes,
//    DatabaseError,
//    Deferrable,
//    ENUM,
//    EagerLoadingError,
//    EmptyResultError,
//    Error,
//    ExclusionConstraintError,
//    FLOAT,
//    ForeignKeyConstraintError,
//    GEOGRAPHY,
//    GEOMETRY,
//    HSTORE,
//    HostNotFoundError,
//    HostNotReachableError,
//    INET,
//    INTEGER,
//    IndexHints,
//    InstanceError,
//    InvalidConnectionError,
//    JSON,
//    JSONB,
//    MACADDR,
//    MEDIUMINT,
    Model,
//    NOW,
//    NUMBER,
//    NUMERIC,
    Op,
//    OptimisticLockError,
//    Promise,
//    QueryError,
//    QueryTypes,
//    RANGE,
//    REAL,
//    SMALLINT,
//    STRING,
    Sequelize,
//    SequelizeScopeError,
//    TEXT,
//    TIME,
//    TINYINT,
//    TableHints,
//    TimeoutError,
//    Transaction,
//    UUID,
//    UUIDV1,
//    UUIDV4,
//    UniqueConstraintError,
//    UnknownConstraintError,
//    Utils,
//    VIRTUAL,
//    ValidationError,
//    ValidationErrorItem,
//    Validator,
//    _setupHooks,
//    addHook,
//    afterAssociate,
//    afterBulkCreate,
//    afterBulkDestroy,
//    afterBulkRestore,
//    afterBulkSync,
//    afterBulkUpdate,
//    afterConnect,
//    afterCreate,
//    afterDefine,
//    afterDestroy,
//    afterDisconnect,
//    afterFind,
//    afterInit,
//    afterQuery,
//    afterRestore,
//    afterSave,
//    afterSync,
//    afterUpdate,
//    afterUpsert,
//    afterValidate,
//    beforeAssociate,
//    beforeBulkCreate,
//    beforeBulkDestroy,
//    beforeBulkRestore,
//    beforeBulkSync,
//    beforeBulkUpdate,
//    beforeConnect,
//    beforeCount,
//    beforeCreate,
//    beforeDefine,
//    beforeDestroy,
//    beforeDisconnect,
//    beforeFind,
//    beforeFindAfterExpandIncludeAll,
//    beforeFindAfterOptions,
//    beforeInit,
//    beforeQuery,
//    beforeRestore,
//    beforeSave,
//    beforeSync,
//    beforeUpdate,
//    beforeUpsert,
//    beforeValidate,
//    default,
//    hasHook,
//    hasHooks,
//    mariadb,
//    mssql,
//    mysql,
//    options,
//    postgres,
//    removeHook,
//    runHooks,
//    sqlite,
//    useInflection,
//    validationFailed,
//    version
}=require('sequelize')

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




const init_dict1=async (mm=[])=>{
    sequelize = conn()
    let m={
          name: STRING,
          pingyin: STRING,
          explain: STRING,
    }
    const table="hwxw"
    class Dict extends Model {}
    Dict.init(m, { sequelize, modelName: table })

    Dict.beforeValidate((x)=>{},{})
    Dict.beforeSave(x=>{ })
    Dict.beforeCreate(x=>{ } )

    const ARR_KEYS=['explain']
    Dict.beforeBulkCreate(x=>x.forEach(join_arr("|")(ARR_KEYS)) ,{})
    await sequelize.sync()
    //return Dict
    o={w:"name","a":"pingyin",b:"explain"}
    m1 = map_keys_by_dict(o)(mm)
    rn=await Dict.bulkCreate(m1)
    return rn
}



const init_dict=async (mm=[])=>{
    sequelize = conn()
    let m={
          name: STRING,
          id: {
              type: INTEGER,
              primaryKey: true,
              allowNull: false,
              autoIncrement: false
          },
          bihua: INTEGER,
          is_usual: INTEGER,
          pingyin: STRING,
          zhuyin: STRING,
          bushou: STRING,
          zixing: STRING,
          tongyima: STRING,
          wubi: STRING,
          cangjie: STRING,
          zhengma: STRING,
          sijiao: STRING,
          bishun: STRING,
          jiben: STRING,
          xiangxi: STRING,
          kangxi: STRING,
          shuowen: STRING,
          pingyin1: TEXT, //ARRAY(TEXT)  pg only
          pingyin2: TEXT,
    }
    const table="dict"
    class Dict extends Model {}
    Dict.init(m, { sequelize, modelName: table })

    Dict.beforeValidate((x)=>{},{})
    Dict.beforeSave(x=>{ })
    Dict.beforeCreate(x=>{ } )

    const ARR_KEYS=['pingyin1','pingyin2']
    Dict.beforeBulkCreate(x=>x.forEach(join_arr("|")(ARR_KEYS)) ,{})
    await sequelize.sync()
   //rn=await Dict.bulkCreate(mm)
    return Dict
}


module.exports={
    init_dict,
    init_dict1,
}


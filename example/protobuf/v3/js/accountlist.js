/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.zzz.AccountList');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');
goog.require('proto.zzz.Account');


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.zzz.AccountList = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.zzz.AccountList.repeatedFields_, null);
};
goog.inherits(proto.zzz.AccountList, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.zzz.AccountList.displayName = 'proto.zzz.AccountList';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.zzz.AccountList.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.zzz.AccountList.prototype.toObject = function(opt_includeInstance) {
  return proto.zzz.AccountList.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.zzz.AccountList} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.zzz.AccountList.toObject = function(includeInstance, msg) {
  var f, obj = {
    index: jspb.Message.getFieldWithDefault(msg, 1, 0),
    listList: jspb.Message.toObjectList(msg.getListList(),
    proto.zzz.Account.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.zzz.AccountList}
 */
proto.zzz.AccountList.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.zzz.AccountList;
  return proto.zzz.AccountList.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.zzz.AccountList} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.zzz.AccountList}
 */
proto.zzz.AccountList.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setIndex(value);
      break;
    case 2:
      var value = new proto.zzz.Account;
      reader.readMessage(value,proto.zzz.Account.deserializeBinaryFromReader);
      msg.addList(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.zzz.AccountList.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.zzz.AccountList.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.zzz.AccountList} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.zzz.AccountList.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIndex();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getListList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.zzz.Account.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 index = 1;
 * @return {number}
 */
proto.zzz.AccountList.prototype.getIndex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.zzz.AccountList.prototype.setIndex = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated Account list = 2;
 * @return {!Array<!proto.zzz.Account>}
 */
proto.zzz.AccountList.prototype.getListList = function() {
  return /** @type{!Array<!proto.zzz.Account>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.zzz.Account, 2));
};


/** @param {!Array<!proto.zzz.Account>} value */
proto.zzz.AccountList.prototype.setListList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.zzz.Account=} opt_value
 * @param {number=} opt_index
 * @return {!proto.zzz.Account}
 */
proto.zzz.AccountList.prototype.addList = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.zzz.Account, opt_index);
};


proto.zzz.AccountList.prototype.clearListList = function() {
  this.setListList([]);
};



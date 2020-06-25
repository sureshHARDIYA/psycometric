const schedule = require('node-schedule');
const database = require('../database');
const Schema = database.Schema;

const schema = new Schema(
  {
    entityName: {
      type: String,
      maxlength: 255,
      required: true,
    },
    entityId: {
      type: String,
      maxlength: 255,
      required: true,
    },
  },
);

schema.statics.getTokens = function (audience, audienceList = []) {
  const condition = {};

  if (audience === 'USER' && audienceList.length > 0) {
    condition.user = { $in: audienceList };
  }

  return this.find(condition, { token: 1 })
}

module.exports = database.model('delayjob', schema);

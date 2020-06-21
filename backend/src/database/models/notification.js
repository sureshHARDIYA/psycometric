const database = require('../database');
const Schema = database.Schema;

const schema = new Schema(
  {
    user: { type: String },
    token: { type: String, required: true },
  },
);

schema.statics.getTokens = function (audience, audienceList = []) {
  const condition = {};

  if (audience === 'USER' && audienceList.length > 0) {
    condition.user = { $in: audienceList };
  }

  return this.find(condition, { token: 1 })
}

module.exports = database.model('notification', schema);

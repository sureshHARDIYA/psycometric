const moment = require('moment');
const database = require('../database');
const Schema = database.Schema;

const ReminderSchema = new Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    schedule: {
      type: Date,
      default: () => moment(),
      set: v => !!v ? v : moment(),
    },
    audience: {
      type: String,
      default: 'ALL',
      enum: ['ALL', 'USER']
    },
    frequency: {
      type: String,
      default: 'WEEKLY',
      enum: ['ONCE', 'WEEKLY', 'BIWEEKLY', 'MONTHLY']
    },
    questionnaire: {
      type: Schema.Types.ObjectId,
      ref: 'questionnaire',
    },
    audienceList: [String],
    test: {
      type: String,
      default: 'no'
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'user' },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true, virtuals: true },
  },
);

module.exports = database.model('reminder', ReminderSchema);

const database = require('../database');
const Schema = database.Schema;

const ReminderSchema = new Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    schedule: {
      type: Date,
      default: () => new Date()
    },
    audience: {
      type: String,
      default: 'ALL',
      enum: ['ALL', 'SELECT']
    },
    frequency: {
      type: String,
      default: 'WEEKLY',
      enum: ['WEEKLY', 'BIWEEKLY', 'MONTHLY']
    },
    questionnaire: {
      type: Schema.Types.ObjectId,
      ref: 'questionnaire',
    },
    audienceList: [String],
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
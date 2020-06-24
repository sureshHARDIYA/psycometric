const moment = require('moment');
const database = require('../database');
const Schema = database.Schema;

/**
 * Questionnaire database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */

const AnswerSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    enum: ['CODE', 'PICTURE', 'TEXT'],
    default: 'TEXT',
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'user' },
})

AnswerSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'user' },
})

QuestionSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const Questionnaire = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      required: true,
      enum: ['ACTIVE', 'INACTIVE', 'DRAFT'],
    },
    level: {
      type: String,
      enum: [
        'JUNIOR',
        'BEGINNER',
        'INTERMEDIATE',
        'SENIOR',
        'EXPERT',
      ],
      default: 'JUNIOR',
    },
    frequency: {
      type: String,
      default: 'EVERYDAY',
      enum: ['EVERYDAY','EVERYWEEK', 'TWICEAWEEK', 'EVERYMONTH']
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'user' },
    favourites: [
      new Schema(
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
          },
        },
        {
          timestamps: { createdAt: true, updatedAt: false },
        },
      ),
    ],
    importHash: { type: String },
    views: { type: Number, default: 0 },
    rules: [{
      min: Number,
      max: Number,
      text: String,
    }],
    answers: [AnswerSchema],
    questions: [{
      title: {
        type: String,
        required: true,
      },
      createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
      updatedBy: { type: Schema.Types.ObjectId, ref: 'user' },
    }],
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
      enum: ['WEEKLY', 'BIWEEKLY', 'MONTHLY']
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true, virtuals: true },
  },
);

Questionnaire.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = database.model(
  'questionnaire',
  Questionnaire,
);

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
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
    },
    views: { type: Number, default: 0 },
    answers: [AnswerSchema],
    questions: [{
      title: {
        type: String,
        required: true,
      },
      createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
      updatedBy: { type: Schema.Types.ObjectId, ref: 'user' },
    }]
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

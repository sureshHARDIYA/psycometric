const database = require('../database');
const Schema = database.Schema;

/**
 * Questionnaire database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
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
    type: {
      type: String,
      default: 'QUIZ',
      enum: ['QUIZ', 'PSYCOMETRIC']
    },
    answers: [{
      title: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        default: 0,
      },
      answerType: {
        type: String,
        enum: ['CODE', 'PICTURE', 'TEXT'],
        default: 'TEXT',
      },
    }],
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

Questionnaire.virtual('questions', {
  ref: 'question',
  localField: '_id',
  foreignField: 'questionnaire',
});

module.exports = database.model(
  'questionnaire',
  Questionnaire,
);

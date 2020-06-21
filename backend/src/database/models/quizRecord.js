const database = require('../database');
const Schema = database.Schema;

const recordSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    randomizeQuestion: {
      type: Boolean,
      default: false,
    },
    questionnaire: {
      type: Schema.Types.ObjectId,
      ref: 'questionnaire',
    },
    total: {
      default:0,
      type: Number,
    },
    duration: {
      default:0,
      type: Number,
    },
    questions: [
      {
        id: String,
        title: String,
        answered: {
          title: {
            type: String,
            required: true,
          },
          type: {
            type: String
          },
          score: {
            type: Number,
            default: 0,
          }
        },
      },
    ],
    candidate: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true, virtuals: true },
  },
);

recordSchema.virtual('score').get(function() {
  return (this.questions || []).reduce((score, question) => score + (question.answered.score || 0), 0)
});

const QuizRecord = database.model(
  'quizRecord',
  recordSchema,
);

module.exports = QuizRecord;

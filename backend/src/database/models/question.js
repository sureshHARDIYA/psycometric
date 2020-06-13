const database = require('../database');
const Schema = database.Schema;

const questionSchema = new Schema(
  {
    title: { type: String, required: true },
    explainAnswer: { type: String },
    questionnaire: {
      type: Schema.Types.ObjectId,
      ref: 'questionnaire',
    },
    answers: [
      {
        title: {
          type: String,
          required: true,
        },
        score: {
          type: Number,
          default: 0,
        },
        isCorrect: {
          type: Boolean,
          default: false,
        },
        answerType: {
          type: String,
          enum: ['CODE', 'PICTURE', 'TEXT'],
          default: 'TEXT',
        },
      },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'user' },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true, virtuals: true },
  },
);

questionSchema.virtual('questionType').get(function() {
  return this.answers.filter((answer) => answer.isCorrect).length > 1 ? 'MULTIPLE' : 'SINGLE';
})

const Question = database.model('question', questionSchema);

module.exports = Question;

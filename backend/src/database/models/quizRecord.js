const database = require('../database');
const Schema = database.Schema;
const { FileSchema } = require('./file');

const recordSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    kind: {
      type: String,
      enum: ['PRACTICE', 'TEST'],
      default: 'PRACTICE',
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
    randomizeQuestion: {
      type: Boolean,
      default: false,
    },
    randomizeOptions: {
      type: Boolean,
      default: false,
    },
    questionnaire: {
      type: Schema.Types.ObjectId,
      ref: 'Questionnaire',
    },
    score: {
      default:0,
      type: Number,
    },
    totalScore: {
      default: 0,
      type: Number,
      get: function(value) {
        if (value > 0) {
          return value;
        }

        return this.questions.reduce((totalScore, question) => {
          return totalScore + question.answers.reduce((score, answer) => answer.isCorrect ? score + answer.score : score, 0)
        }, 0)
      }
    },
    duration: {
      default:0,
      type: Number,
    },
    questions: [
      {
        question: {
          type: Schema.Types.ObjectId,
          ref: 'Question',
        },
        score: Number,
        questionText: String,
        answers: [
          {
            title: {
              type: String,
              required: true,
            },
            answer: {
              type: String,
              required: true,
            },
            score: Number,
            selected: {
              type: Boolean,
              default: false,
            },
            isCorrect: {
              type: Boolean,
              default: false,
            },
          },
        ],
      },
    ],
    candidate: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true, virtuals: true },
  },
);

recordSchema.virtual('passed').get(function() {
  return this.totalScore > 0 ? this.score / this.totalScore < 0.45 : false;
});

recordSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('quetions')) {
    this.score = 0;
    this.questions.forEach(question => {
      const { score, totalScore } = question.answers.reduce((obj, answer) => {
        if (answer.isCorrect) {
          obj.totalScore = answer.score;
        }

        if (!obj.continue || !answer.isCorrect) {
          return obj;
        }

        if (!answer.selected) {
          return ({ score: 0, continue: false });
        }

        return ({ score: obj.score + answer.score, continue: true })
      }, { score: 0, continue: true, totalScore: 0 });

      question.score = score;
      this.score += score;
      this.totalScore += totalScore;
    })
  }

  next();
});

const QuizRecord = database.model(
  'quizRecord',
  recordSchema,
);

module.exports = QuizRecord;

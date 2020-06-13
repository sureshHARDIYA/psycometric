const database = require('../database');
const Schema = database.Schema;

const feedbackSchema = new Schema(
  {
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toObject: { getters: true },
    toJSON: { getters: true },
  },
);
const Feedback = database.model('feedback', feedbackSchema);

module.exports = Feedback;

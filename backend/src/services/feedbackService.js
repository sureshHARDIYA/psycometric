const ValidationError = require('../errors/validationError');
const FeedbackRepository = require('../database/repositories/feedbackRepository');
const MongooseRepository = require('../database/repositories/mongooseRepository');

module.exports = class FeedbackService {
  constructor({ language }) {
    this.repository = new FeedbackRepository();
    this.language = language;
  }

  /**
   * Creates a Feedback.
   *
   * @param {*} data
   */
  async create(data) {
    try {
      return this.repository.create(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Destroy all Feedbacks with those ids.
   *
   * @param {*} ids
   */
  async destroyAll(ids) {
    try {
      for (const id of ids) {
        await this.repository.destroy(id);
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Finds the Feedback by Id.
   *
   * @param {*} id
   */
  async findById(id) {
    return this.repository.findById(id);
  }

  /**
   * Finds Feedbacks based on the query.
   *
   * @param {*} args
   */
  async findAndCountAll(args) {
    return this.repository.findAndCountAll(args);
  }
};

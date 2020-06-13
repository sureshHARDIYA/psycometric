const AnswerRepository = require('../database/repositories/answerRepository');
const MongooseRepository = require('../database/repositories/mongooseRepository');

/**
 * Handles Answer operations
 */
module.exports = class AnswerService {
  constructor({ currentUser, language }) {
    this.repository = new AnswerRepository();
    this.currentUser = currentUser;
    this.language = language;
  }

  /**
   * Creates a Answer.
   *
   * @param {*} data
   */
  async create(questionnaireId, data) {
    const session = await MongooseRepository.createSession();

    try {
      const record = await this.repository.create(questionnaireId, data, {
        session: session,
        currentUser: this.currentUser,
      });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  /**
   * Updates a Question.
   *
   * @param {*} id
   * @param {*} data
   */
  async update(id, data) {
    const session = await MongooseRepository.createSession();

    try {
      const record = await this.repository.update(
        id,
        data,
        {
          session,
          currentUser: this.currentUser,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  /**
   * Updates a Question.
   *
   * @param {*} id
   * @param {*} data
   */
  async createQuestion(id, data) {
    const session = await MongooseRepository.createSession();

    try {
      const record = await this.repository.findOneAndUpdate(
        { _id: id },
        { $push: { questions: data } },
        {
          session,
          currentUser: this.currentUser,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  /**
   * Destroy all Questions with those ids.
   *
   * @param {*} ids
   */
  async destroyAll(ids) {
    const session = await MongooseRepository.createSession();

    try {
      for (const id of ids) {
        await this.repository.destroy(id, {
          session,
          currentUser: this.currentUser,
        });
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  /**
   * Finds the Question by Id.
   *
   * @param {*} id
   */
  async findById(id) {
    return this.repository.findById(id);
  }

  /**
   * Finds Questions based on the query.
   *
   * @param {*} args
   */
  async findAndCountAll(args) {
    return this.repository.findAndCountAll(args);
  }
};

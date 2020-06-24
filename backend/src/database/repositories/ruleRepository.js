const MongooseRepository = require('./mongooseRepository');
const AuditLogRepository = require('./auditLogRepository');
const Rule = require('../models/questionnaire');

class RuleRepository {
  /**
   * Creates the rule in questionnaire.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  async create({ questionnaire: id, ...data }, options) {
    if (MongooseRepository.getSession(options)) {
      await Rule.createCollection();
    }

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    await Rule.updateOne(
      { _id: id },
      { $push: {
        rules: {
          ...data,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        }
      }},
      MongooseRepository.getSessionOptionsIfExists(options),
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    return this.findById(id, options, true);
  }

  /**
   * Updates the Rule.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  async update(id, data, options) {
    const params = Object.entries({
      ...data,
      updatedBy: MongooseRepository.getCurrentUser(
        options,
      ).id,
    }).reduce((obj, [k, v]) => ({
      ...obj,
      [`rules.$.${k}`]: v
    }), {})

    await MongooseRepository.wrapWithSessionIfExists(
      Rule.updateOne(
        { 'rules._id': id },
        { $set: params }
      ),
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    return this.findById(id, options);
  }

  /**
   * Deletes the Rule.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async destroy(id, options) {
    console.log('id:', id)

    await MongooseRepository.wrapWithSessionIfExists(
      Rule.updateOne({ 'rules._id': id }, { $pull: { rules: { _id: MongooseRepository.idFromString(id) } }}),
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      null,
      options,
    );

    return true;
  }

  /**
   * Finds the Question and its relations.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async findById(id, options, isNew) {
    if (isNew) {
      const record = await MongooseRepository.wrapWithSessionIfExists(
        Rule.findOne({ _id: id }, { rules: 1 }),
        options,
      );

      return record.rules.slice(-1)[0];
    }

    const rs = await MongooseRepository.wrapWithSessionIfExists(
      Rule.findOne({ 'rules._id': id }, { rules: 1 }),
      options,
    );

    return rs.rules.find((i) => i.id === id);
  }

  /**
   * Creates an audit log of the operation.
   *
   * @param {string} action - The action [create, update or delete].
   * @param {object} id - The record id
   * @param {object} data - The new data passed on the request
   * @param {object} options
   */
  async _createAuditLog(action, id, data, options) {
    await AuditLogRepository.log(
      {
        entityName: Rule.modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }
}

module.exports = RuleRepository;

const MongooseRepository = require('./mongooseRepository');
const MongooseQueryUtils = require('../utils/mongooseQueryUtils');
const AuditLogRepository = require('./auditLogRepository');
const Question = require('../models/questionnaire');

class QuestionRepository {
  /**
   * Creates the Question.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  async create({ questionnaire: id, ...data }, options) {
    if (MongooseRepository.getSession(options)) {
      await Question.createCollection();
    }

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    await Question.updateOne(
      { _id: id },
      { $push: {
        questions: {
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
   * Updates the Question.
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
      [`questions.$.${k}`]: v
    }), {})

    await MongooseRepository.wrapWithSessionIfExists(
      Question.updateOne(
        { 'questions._id': id },
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
   * Deletes the Question.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async destroy(id, options) {
    await MongooseRepository.wrapWithSessionIfExists(
      Question.updateOne({ 'questions._id': id }, { $pull: { questions: { _id: id } }}),
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
   * Counts the number of Questions based on the filter.
   *
   * @param {Object} filter
   * @param {Object} [options]
   */
  async count(filter, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      Question.countDocuments(filter),
      options,
    );
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
        Question.findOne({ _id: id }, { questions: 1 }),
        options,
      );

      return record.questions.slice(-1)[0];
    }

    const rs = await MongooseRepository.wrapWithSessionIfExists(
      Question.findOne({ 'questions._id': id }, { questions: 1 }),
      options,
    );

    return rs.questions.find((i) => i.id === id);
  }

  /**
   * Finds the Questions based on the query.
   * See https://mongoosejs.com/docs/queries.html to learn how
   * to customize the queries.
   *
   * @param {Object} query
   * @param {Object} query.filter
   * @param {number} query.limit
   * @param  {number} query.offset
   * @param  {string} query.orderBy
   *
   * @returns {Promise<Object>} response - Object containing the rows and the count.
   */
  async findAndCountAll(
    { filter, limit, offset, orderBy } = {
      filter: null,
      limit: 0,
      offset: 0,
      orderBy: null,
    },
    options,
  ) {
    let criteria = {};

    if (filter) {
      if (filter.id) {
        criteria = {
          ...criteria,
          _id: MongooseQueryUtils.uuid(filter.id),
        };
      }

      if (filter.name) {
        criteria = {
          ...criteria,
          name: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.name,
            ),
            $options: 'i',
          },
        };
      }

      if (filter.description) {
        criteria = {
          ...criteria,
          description: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.description,
            ),
            $options: 'i',
          },
        };
      }

      if (filter.status) {
        criteria = { ...criteria, status: filter.status };
      }

      if (filter.availableFromRange) {
        const [start, end] = filter.availableFromRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteria = {
            ...criteria,
            availableFrom: {
              ...criteria.availableFrom,
              $gte: start,
            },
          };
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          criteria = {
            ...criteria,
            availableFrom: {
              ...criteria.availableFrom,
              $lte: end,
            },
          };
        }
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteria = {
            ...criteria,
            createdAt: {
              ...criteria.createdAt,
              $gte: start,
            },
          };
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          criteria = {
            ...criteria,
            createdAt: { ...criteria.createdAt, $lte: end },
          };
        }
      }
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_DESC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;

    const rows = await Question.find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate('modules')
      .populate('patients');

    const count = await Question.countDocuments(criteria);

    return { rows, count };
  }

  /**
   * Lists the Questions to populate the autocomplete.
   * See https://mongoosejs.com/docs/queries.html to learn how to
   * customize the query.
   *
   * @param {Object} search
   * @param {number} limit
   */
  async findAllAutocomplete(search, limit) {
    let criteria = {};

    if (search) {
      criteria = {
        $or: [
          { _id: MongooseQueryUtils.uuid(search) },
          {
            name: {
              $regex: MongooseQueryUtils.escapeRegExp(
                search,
              ),
              $options: 'i',
            },
          },
        ],
      };
    }

    const sort = MongooseQueryUtils.sort('name_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const records = await Question.find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record['name'],
    }));
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
        entityName: Question.modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }
}

module.exports = QuestionRepository;

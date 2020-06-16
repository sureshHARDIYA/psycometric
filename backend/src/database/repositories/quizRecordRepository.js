const _get = require('lodash/get');
const MongooseRepository = require('./mongooseRepository');
const MongooseQueryUtils = require('../utils/mongooseQueryUtils');
const AuditLogRepository = require('./auditLogRepository');
const QuizRecord = require('../models/quizRecord');
const Questionnaire = require('../models/questionnaire');

class QuizRecordRepository {
  async create(formData, options) {
    const data = { ...formData };

    if (MongooseRepository.getSession(options)) {
      await QuizRecord.createCollection();
    }

    const questionnaire = await Questionnaire.findById(data.questionnaire)

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const [record] = await QuizRecord.create(
      [
        {
          ...data,
          title: questionnaire.name,
          level: questionnaire.level,
          createdBy: currentUser.id,
          candidate: currentUser.id,
          updatedBy: currentUser.id,
          questionnaire: questionnaire.id,
        },
      ],
      MongooseRepository.getSessionOptionsIfExists(options),
    );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  /**
   * Updates the QuizRecord.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  async update(id, data, options) {
    await MongooseRepository.wrapWithSessionIfExists(
      QuizRecord.updateOne(
        { _id: id },
        {
          ...data,
          updatedBy: MongooseRepository.getCurrentUser(
            options,
          ).id,
        },
      ),
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    const record = await this.findById(id, options);

    return record;
  }

  /**
   * Deletes the QuizRecord.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async destroy(id, options) {
    await MongooseRepository.wrapWithSessionIfExists(
      QuizRecord.deleteOne({ _id: id }),
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      null,
      options,
    );
  }

  /**
   * Counts the number of QuizRecords based on the filter.
   *
   * @param {Object} filter
   * @param {Object} [options]
   */
  async count(filter, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      QuizRecord.countDocuments(filter),
      options,
    );
  }

  /**
   * Finds the QuizRecord and its relations.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async findById(id, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      QuizRecord.findById(id)
        .populate('modules')
        .populate('patients'),
      options,
    );
  }

  /**
   * Finds the QuizRecords based on the query.
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

      if (filter.kind) {
        criteria.kind = filter.kind;
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

      if (filter.candidate) {
        criteria = { ...criteria, candidate: filter.candidate };
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
    const rows = await QuizRecord.find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await QuizRecord.countDocuments(criteria);

    const rs = await QuizRecord.find(criteria, 'score').sort({ score: -1 }).limit(1);
    return { rows, count, max: _get(rs, '[0].score', 0) };
  }

  /**
   * Lists the QuizRecords to populate the autocomplete.
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

    const records = await QuizRecord.find(criteria)
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
        entityName: QuizRecord.modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }
}

module.exports = QuizRecordRepository;

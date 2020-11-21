const _get = require('lodash/get')
const Roles = require('../../security/roles');
const Emotion = require('../models/emotions')
const MongooseRepository = require('./mongooseRepository')
const AuditLogRepository = require('./auditLogRepository')
const MongooseQueryUtils = require('../utils/mongooseQueryUtils')

class EmotionRepository {
  /**
   * Creates the Emotion.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  async create (data, options) {
    if (MongooseRepository.getSession(options)) {
      await Emotion.createCollection()
    }

    const currentUser = MongooseRepository.getCurrentUser(options)

    const [ record ] = await Emotion.create(
        [ { ...data, createdBy: currentUser.id, updatedBy: currentUser.id } ],
        MongooseRepository.getSessionOptionsIfExists(options)
    )

    await this._createAuditLog(
        AuditLogRepository.CREATE,
        record.id,
        data,
        options
    )

    return await this.findById(record.id, options)
  }

  /**
   * Finds the QuizRecord and its relations.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async findById (id, options) {
    return MongooseRepository.wrapWithSessionIfExists(
        Emotion.findById(id).populate('createdBy'),
        options
    )
  }

  /**
   * Finds the Emotion based on the query.
   * See https://mongoosejs.com/docs/queries.html to learn how
   * to customize the queries.
   *
   */
  async findAndCountAll (
      { filter, limit, offset, orderBy } = {
        filter: null,
        limit: 0,
        offset: 0,
        orderBy: null
      },
      options
  ) {
    let criteria = {}
    const currentUser = MongooseRepository.getCurrentUser(options)

    if (filter) {
      if (filter.id) {
        criteria = { ...criteria, _id: MongooseQueryUtils.uuid(filter.id) }
      }

      if (filter.emotion) {
        criteria = {
          ...criteria,
          emotion: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.title),
            $options: 'i'
          }
        }
      }
      if (filter.createdBy && !(filter.roles && filter.roles.includes(Roles.values.owner))) {
        criteria = { ...criteria, createdBy: currentUser.id }
      }

      if (filter.createdAtRange) {
        const [ start, end ] = filter.createdAtRange

        if (start !== undefined && start !== null && start !== '') {
          criteria = {
            ...criteria,
            createdAt: { ...criteria.createdAt, $gte: start }
          }
        }

        if (end !== undefined && end !== null && end !== '') {
          criteria = {
            ...criteria,
            createdAt: { ...criteria.createdAt, $lte: end }
          }
        }
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || 'createdAt_DESC')

    const skip = Number(offset || 0) || undefined
    const limitEscaped = Number(limit || 0) || undefined
    const rows = await Emotion
        .find(criteria)
        .populate('createdBy')
        .skip(skip)
        .limit(limitEscaped)
        .sort(sort)

    const count = await Emotion.countDocuments(criteria)

    const rs = await Emotion
        .find(criteria, 'score')
        .sort({ score: -1 })
        .limit(1)
    return { rows, count, max: _get(rs, '[0].score', 0) }
  }

  /**
   * Updates the Emotion.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  async update (id, data, options) {
    await MongooseRepository.wrapWithSessionIfExists(
        Emotion.updateOne({ _id: id }, {
          ...data,
          updatedBy: MongooseRepository.getCurrentUser(options).id
        }),
        options
    )

    await this._createAuditLog(AuditLogRepository.UPDATE, id, data, options)

    const record = await this.findById(id, options)

    return record
  }

  /**
   * Deletes the Emotion.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async destroy (id, options) {
    await MongooseRepository.wrapWithSessionIfExists(
        Emotion.deleteOne({ _id: id }),
        options
    )

    await this._createAuditLog(AuditLogRepository.DELETE, id, null, options)
  }

  /**
   * Counts the number of Emotions based on the filter.
   *
   * @param {Object} filter
   * @param {Object} [options]
   */
  async count (filter, options) {
    return MongooseRepository.wrapWithSessionIfExists(
        Emotion.countDocuments(filter),
        options
    )
  }

  /**
   * Creates an audit log of the operation.
   *
   * @param {string} action - The action [create, update or delete].
   * @param {object} id - The record id
   * @param {object} data - The new data passed on the request
   * @param {object} options
   */
  async _createAuditLog (action, id, data, options) {
    await AuditLogRepository.log(
        { entityName: Emotion.modelName, entityId: id, action, values: data },
        options
    )
  }
}

module.exports = EmotionRepository
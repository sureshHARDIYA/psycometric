const MongooseRepository = require('./mongooseRepository');
const MongooseQueryUtils = require('../utils/mongooseQueryUtils');
const AuditLogRepository = require('./auditLogRepository');
const Questionnaire = require('../models/questionnaire');
const _find = require('lodash/find');
const _hasIn = require('lodash/hasIn');
const { ObjectId } = require('mongodb');
const NotificationRepository = require('./notificationRepository');

/**
 * Handles database operations for the Questionnaire.
 * See https://mongoosejs.com/docs/index.html to learn how to customize it.
 */
class QuestionnaireRepository {
  /**
   * Creates the Questionnaire.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  async create(data, options) {
    if (MongooseRepository.getSession(options)) {
      await Questionnaire.createCollection();
    }

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const [record] = await Questionnaire.create(
      [
        {
          ...data,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
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

    const newRecord = await this.findById(record.id, options);
    NotificationRepository.scheduleQuestionnaire(newRecord, options)

    return newRecord;
  }

  /**
   * Updates the Questionnaire.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  async update(id, data, options) {
    await MongooseRepository.wrapWithSessionIfExists(
      Questionnaire.updateOne(
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
    NotificationRepository.scheduleQuestionnaire(record, options)

    return record;
  }

  async updateFavourites(id, data, options) {
    const item = await Questionnaire.findById(id);
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );
    const user = ObjectId(currentUser.id).valueOf();

    if (
      _hasIn(item, 'favourites') &&
      _find(item.favourites, {
        user,
      }) !== undefined
    ) {
      await MongooseRepository.wrapWithSessionIfExists(
        Questionnaire.updateOne(
          { _id: id },
          {
            $pull: {
              favourites: {
                user,
              },
            },
          },
        ),
        options,
      );
    } else {
      await MongooseRepository.wrapWithSessionIfExists(
        Questionnaire.updateOne(
          { _id: id },
          {
            $push: {
              favourites: {
                user,
              },
            },
          },
        ),
        options,
      );
    }

    return await this.findById(id, options);
  }

  /**
   * Deletes the Questionnaire.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async destroy(id, options) {
    await MongooseRepository.wrapWithSessionIfExists(
      Questionnaire.deleteOne({ _id: id }),
      options,
    );

    NotificationRepository.delete(id)

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      null,
      options,
    );
  }

  /**
   * Counts the number of Questionnaires based on the filter.
   *
   * @param {Object} filter
   * @param {Object} [options]
   */
  async count(filter, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      Questionnaire.countDocuments(filter),
      options,
    );
  }

  /**
   * Finds the Questionnaire and its relations.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async findById(id, options) {
    await Questionnaire.findOneAndUpdate(
      { _id: id },
      { $inc: { views: 1 } },
      { new: true },
    );
    return MongooseRepository.wrapWithSessionIfExists(
      Questionnaire.findById(id)
        .populate('favourites.user')
        .populate('createdBy'),
      options,
    );
  }

  /**
   * Finds the Questionnaires based on the query.
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

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

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
        criteria = {
          ...criteria,
          status: {
            $in: Array.isArray(filter.status)
              ? filter.status
              : [filter.status],
          },
        };
      }

      if (filter.level) {
        criteria = { ...criteria, level: filter.level };
      }

      if (filter.favourite) {
        criteria = {
          ...criteria,
          'favourites.user': filter.favourite,
        };
      }

      if (filter.createdBy) {
        criteria = {
          ...criteria,
          createdBy: filter.createdBy,
        };
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

    const rows = await Questionnaire.find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .populate('favourites.user')
      .populate('createdBy')
      .sort(sort);

    const count = await Questionnaire.countDocuments(
      criteria,
    );

    return { rows, count, offset: skip };
  }

  /**
   * Lists the Questionnaires to populate the autocomplete.
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

    const records = await Questionnaire.find(criteria)
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
        entityName: Questionnaire.modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }

  /**
   * Setup the questionnaire for push notification when server is started.
   *
   */
  static async reloadAllSchedule() {
    console.log('Reload all questionnaire')
    try {
      const list = await Questionnaire.find({});
      for (const Questionnaire of list) {
        NotificationRepository.scheduleQuestionnaire(Questionnaire)
      }
    } catch (e) {
      console.log('error');
    }
  }
}

module.exports = QuestionnaireRepository;

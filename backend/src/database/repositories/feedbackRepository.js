const MongooseRepository = require('./mongooseRepository');
const MongooseQueryUtils = require('../utils/mongooseQueryUtils');
const AuditLogRepository = require('./auditLogRepository');
const Feedback = require('../models/feedback');

class FeedbackRepository {
  async create(data, options) {
    if (MongooseRepository.getSession(options)) {
      await Feedback.createCollection();
    }
    return await Feedback.create(data);
  }

  async destroy(id, options) {
    await MongooseRepository.wrapWithSessionIfExists(
      Feedback.deleteOne({ _id: id }),
      options,
    );
  }

  async count(filter, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      Feedback.countDocuments(filter),
      options,
    );
  }

  async findById(id, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      Feedback.findById(id).populate('questionnaires'),
      options,
    );
  }

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

      if (filter.email) {
        criteria = {
          ...criteria,
          email: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.email,
            ),
            $options: 'i',
          },
        };
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

    const rows = await Feedback.find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);
    const count = await Feedback.countDocuments(criteria);

    return { rows, count };
  }
}

module.exports = FeedbackRepository;

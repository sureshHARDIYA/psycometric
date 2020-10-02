const MongooseRepository = require('./mongooseRepository');
const MongooseQueryUtils = require('../utils/mongooseQueryUtils');
const AuditLogRepository = require('./auditLogRepository');

const Emotion = require('../models/emotions');

class EmotionRepository {
    /**
     * Creates the Emotion.
     *
     * @param {Object} data
     * @param {Object} [options]
     */
    async create(data, options) {
        if (MongooseRepository.getSession(options)) {
            await Emotion.createCollection();
        }

        const currentUser = MongooseRepository.getCurrentUser(
            options,
        );

        const [record] = await Emotion.create(
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

        const newRecord = await this.findById(
            record.id,
            options,
        );

        return newRecord;
    }

    /**
     * Updates the Emotion.
     *
     * @param {Object} data
     * @param {Object} [options]
     */
    async update(id, data, options) {
        await MongooseRepository.wrapWithSessionIfExists(
            Emotion.updateOne(
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
     * Deletes the Emotion.
     *
     * @param {string} id
     * @param {Object} [options]
     */
    async destroy(id, options) {
        await MongooseRepository.wrapWithSessionIfExists(
            Emotion.deleteOne({ _id: id }),
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
     * Counts the number of Emotions based on the filter.
     *
     * @param {Object} filter
     * @param {Object} [options]
     */
    async count(filter, options) {
        return MongooseRepository.wrapWithSessionIfExists(
            Emotion.countDocuments(filter),
            options,
        );
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
                entityName: Emotion.modelName,
                entityId: id,
                action,
                values: data,
            },
            options,
        );
    }
}

module.exports = EmotionRepository;

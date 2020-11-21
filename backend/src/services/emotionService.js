const ValidationError = require('../errors/validationError')
const EmotionRepository = require('../database/repositories/emotionRepository')
const MongooseRepository = require(
    '../database/repositories/mongooseRepository'
)

/**
 * Handles Emotion operations
 */
module.exports = class EmotionService {
  constructor ({ currentUser, language }) {
    this.repository = new EmotionRepository()
    this.currentUser = currentUser
    this.language = language
  }

  /**
   * Creates an Emotion.
   *
   * @param {*} data
   */
  async create (data) {
    const session = await MongooseRepository.createSession()

    try {
      const record = await this.repository.create(data, {
        session: session,
        currentUser: this.currentUser
      })

      await MongooseRepository.commitTransaction(session)

      return record
    } catch (error) {
      await MongooseRepository.abortTransaction(session)
      throw error
    }
  }

  /**
   * Updates an Emotion.
   *
   * @param {*} id
   * @param {*} data
   */
  async update (id, data) {
    const session = await MongooseRepository.createSession()

    try {
      const record = await this.repository.update(id, data, {
        session,
        currentUser: this.currentUser
      })

      await MongooseRepository.commitTransaction(session)

      return record
    } catch (error) {
      await MongooseRepository.abortTransaction(session)
      throw error
    }
  }

  /**
   * Creates an Emotion.
   *
   * @param {*} id
   * @param {*} data
   */
  async createEmotion (id, data) {
    const session = await MongooseRepository.createSession()

    try {
      const record = await this.repository.findOneAndUpdate(
          { _id: id },
          { $push: { emotions: data } },
          { session, currentUser: this.currentUser }
      )

      await MongooseRepository.commitTransaction(session)

      return record
    } catch (error) {
      await MongooseRepository.abortTransaction(session)
      throw error
    }
  }

  /**
   * Destroy all emotions with those ids.
   *
   * @param {*} ids
   */
  async destroyAll (ids) {
    const session = await MongooseRepository.createSession()

    try {
      for (const id of ids) {
        await this.repository.destroy(id, {
          session,
          currentUser: this.currentUser
        })
      }

      await MongooseRepository.commitTransaction(session)
    } catch (error) {
      await MongooseRepository.abortTransaction(session)
      throw error
    }
  }

  /**
   * Finds the Emotion by Id.
   *
   * @param {*} id
   */
  async findById (id) {
    return this.repository.findById(id)
  }

  /**
   * Finds emotions for Autocomplete.
   *
   * @param {*} search
   * @param {*} limit
   */
  async findAllAutocomplete (search, limit) {
    return this.repository.findAllAutocomplete(search, limit)
  }

  /**
   * Finds emotions based on the query.
   *
   * @param {*} args
   */
  async findAndCountAll (args) {
    return this.repository.findAndCountAll(args, { currentUser: this.currentUser })
  }

  /**
   * Imports a list of emotions.
   *
   * @param {*} data
   * @param {*} importHash
   */
  async import (data, importHash) {
    if (!importHash) {
      throw new ValidationError(
          this.language,
          'importer.errors.importHashRequired'
      )
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new ValidationError(
          this.language,
          'importer.errors.importHashExistent'
      )
    }

    const dataToCreate = { ...data, importHash }

    return this.create(dataToCreate)
  }

  /**
   * Checks if the import hash already exists.
   * Every item imported has a unique hash.
   *
   * @param {*} importHash
   */
  async _isImportHashExistent (importHash) {
    const count = await this.repository.count({ importHash })

    return count > 0
  }
}
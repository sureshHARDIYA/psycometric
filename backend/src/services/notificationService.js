const NotificationRepository = require('../database/repositories/notificationRepository');

module.exports = class NotificationService {
  constructor({ language }) {
    this.repository = new NotificationRepository();
    this.language = language;
  }

  /**
   * Creates a notification.
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
   * Destroy all notifications with those ids.
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
   * Finds the notification by Id.
   *
   * @param {*} id
   */
  async findById(id) {
    return this.repository.findById(id);
  }

  /**
   * Finds notifications based on the query.
   *
   * @param {*} args
   */
  async findAndCountAll(args) {
    return this.repository.findAndCountAll(args);
  }
};

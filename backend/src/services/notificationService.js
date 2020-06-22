const NotificationRepository = require('../database/repositories/notificationRepository');

module.exports = class NotificationService {
  constructor({ language }) {
    this.language = language;
  }

  /**
   * Creates a notification.
   *
   * @param {*} data
   */
  async create(data) {
    try {
      return NotificationRepository.create(data);
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
        await NotificationRepository.destroy(id);
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
    return NotificationRepository.findById(id);
  }

  /**
   * Finds notifications based on the query.
   *
   * @param {*} args
   */
  async findAndCountAll(args) {
    return NotificationRepository.findAndCountAll(args);
  }
};

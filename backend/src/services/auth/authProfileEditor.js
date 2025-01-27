const assert = require('assert');
const bcrypt = require('bcrypt');
const ValidationError = require('../../errors/validationError');
const UserRepository = require('../../database/repositories/userRepository');
const MongooseRepository = require('../../database/repositories/mongooseRepository');
const authService= require('./authService');

/**
 * Handles the update of the user profile.
 */
module.exports = class AuthProfileEditor {
  constructor(currentUser, language) {
    this.currentUser = currentUser;
    this.language = language;

    this.session = null;
  }

  /**
   * Executes the user update.
   *
   * @param {*} data
   */
  async execute({ password, newPassword, ...data }) {
    this.data = data;

    if (password && newPassword) {
      const passwordsMatch = await bcrypt.compare(
        password,
        this.currentUser.password,
      );

      if (!passwordsMatch) {
        throw new ValidationError(
          this.language,
          'auth.wrongPassword',
        );
      }

      this.data.password = await bcrypt.hash(
        newPassword,
        authService.BCRYPT_SALT_ROUNDS,
      );
    }

    await this._validate();

    try {
      this.session = await MongooseRepository.createSession();

      await this._loadUser();
      await this._updateAtDatabase();

      await MongooseRepository.commitTransaction(
        this.session,
      );
    } catch (error) {
      await MongooseRepository.abortTransaction(
        this.session,
      );
      throw error;
    }
  }

  /**
   * Loads the user.
   */
  async _loadUser() {
    this.user = await UserRepository.findById(
      this.currentUser.id,
      { session: this.session },
    );
  }

  /**
   * Updates the user at the database.
   */
  async _updateAtDatabase() {
    this.user = await UserRepository.updateProfile(
      this.currentUser.id,
      this.data,
      {
        currentUser: this.currentUser,
        session: this.session,
      },
    );
  }

  /**
   * Validates the user info.
   */
  async _validate() {
    assert(this.currentUser, 'currentUser is required');
    assert(
      this.currentUser.id,
      'currentUser.id is required',
    );
    assert(
      this.currentUser.email,
      'currentUser.email is required',
    );

    assert(this.data, 'profile is required');
  }
};

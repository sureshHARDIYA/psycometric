/**
 * List of Roles available for the Users.
 */
class Roles {
  static get values() {
    return {
      owner: 'owner',
      editor: 'editor',
      doctor: 'doctor',
      patient: 'patient',
      public: 'public',
    };
  }
}

module.exports = Roles;

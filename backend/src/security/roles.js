/**
 * List of Roles available for the Users.
 */
class Roles {
  static get values() {
    return {
      owner: 'owner',
      editor: 'editor',
      trainer: 'trainer',
      learner: 'learner',
      member: 'member',
      public: 'public',
    };
  }
}

module.exports = Roles;

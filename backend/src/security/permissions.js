const Roles = require('./roles');
const roles = Roles.values;

/**
 * List of Permissions and the Roles allowed of using them.
 */
class Permissions {
  static get values() {
    return {
      public: {
        id: 'public',
        allowedRoles: [roles.public],
      },
      member: {
        id: 'member',
        allowedRoles: [roles.member],
      },
      owner: {
        id: 'owner',
        allowedRoles: [roles.owner],
      },
      iamEdit: {
        id: 'iamEdit',
        allowedRoles: [roles.owner],
        allowedStorageFolders: ['user'],
      },
      iamCreate: {
        id: 'iamCreate',
        allowedRoles: [roles.owner],
      },
      iamImport: {
        id: 'iamImport',
        allowedRoles: [roles.owner],
      },
      iamRead: {
        id: 'iamRead',
        allowedRoles: [roles.owner],
      },
      iamUserAutocomplete: {
        id: 'iamUserAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.trainer,
        ],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.trainer,
          roles.learner,
        ],
      },
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.owner],
      },
      questionnaireImport: {
        id: 'questionnaireImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.trainer,
        ],
      },
      reminderImport: {
        id: 'reminderImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.trainer,
        ],
      },
      questionnaireCreate: {
        id: 'questionnaireCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.trainer,
        ],
        allowedStorageFolders: ['questionnaire'],
      },
      questionCreate: {
        id: 'questionCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.trainer,
        ],
        allowedStorageFolders: ['question'],
      },
      reminderCreate: {
        id: 'reminderCreate',
        allowedRoles: [roles.owner, roles.editor],
        allowedStorageFolders: ['reminder'],
      },
      questionEdit: {
        id: 'questionEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.trainer,
        ],
        allowedStorageFolders: ['question'],
      },
      reminderEdit: {
        id: 'reminderEdit',
        allowedRoles: [roles.owner, roles.editor],
        allowedStorageFolders: ['reminder'],
      },
      questionnaireEdit: {
        id: 'questionnaireEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.trainer,
        ],
        allowedStorageFolders: ['questionnaire'],
      },
      questionnaireDestroy: {
        id: 'questionnaireDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.trainer,
        ],
        allowedStorageFolders: ['questionnaire'],
      },
      questionDestroy: {
        id: 'questionDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.trainer,
        ],
        allowedStorageFolders: ['question'],
      },
      reminderDestroy: {
        id: 'reminderDestroy',
        allowedRoles: [roles.owner, roles.editor],
        allowedStorageFolders: ['reminder'],
      },
      questionnaireRead: {
        id: 'questionnaireRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.trainer,
          roles.member,
          roles.learner,
          roles.public,
        ],
      },
      questionRead: {
        id: 'questionRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.trainer,
          roles.member,
          roles.learner,
          roles.public,
        ],
      },
      reminderRead: {
        id: 'reminderRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.trainer,
          roles.member,
          roles.learner,
          roles.public,
        ],
      },
      questionnaireAutocomplete: {
        id: 'questionnaireAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.trainer,
        ],
      },
      reminderAutocomplete: {
        id: 'reminderAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.trainer,
        ],
      },
      feedbackRead: {
        id: 'feedbackRead',
        allowedRoles: [roles.owner, roles.editor],
      },
      quizRecordRead: {
        id: 'feedbackRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.trainer,
        ],
      },
      quizRecordAutocomplete: {
        id: 'feedbackRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.trainer,
        ],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

module.exports = Permissions;

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
      patient: {
        id: 'patient',
        allowedRoles: [roles.patient],
      },
      owner: {
        id: 'owner',
        allowedRoles: [roles.owner],
      },
      editor: {
        id: 'editor',
        allowedRoles: [roles.editor],
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
          roles.doctor,
        ],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.doctor,
          roles.patient,
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
          roles.doctor,
        ],
      },
      reminderImport: {
        id: 'reminderImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.doctor,
        ],
      },
      questionnaireCreate: {
        id: 'questionnaireCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.doctor,
        ],
        allowedStorageFolders: ['questionnaire'],
      },
      questionCreate: {
        id: 'questionCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.doctor,
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
          roles.doctor,
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
          roles.doctor,
        ],
        allowedStorageFolders: ['questionnaire'],
      },
      questionnaireDestroy: {
        id: 'questionnaireDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.doctor,
        ],
        allowedStorageFolders: ['questionnaire'],
      },
      questionDestroy: {
        id: 'questionDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.doctor,
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
          roles.doctor,
          roles.patient,
          roles.public,
        ],
      },
      questionRead: {
        id: 'questionRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.doctor,
          roles.patient,
          roles.public,
        ],
      },
      reminderRead: {
        id: 'reminderRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.doctor,
          roles.patient,
          roles.public,
        ],
      },
      questionnaireAutocomplete: {
        id: 'questionnaireAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.doctor,
        ],
      },
      reminderAutocomplete: {
        id: 'reminderAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.doctor,
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
          roles.doctor,
        ],
      },
      quizRecordAutocomplete: {
        id: 'feedbackRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.doctor,
        ],
      },
      emotionCreate: {
        id: 'emotionCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.doctor,
          roles.patient,
        ]
      },
      emotionDestroy: {
        id: 'emotionDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.doctor,
          roles.patient,
        ]
      },
      emotionEdit: {
        id: 'emotionEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.doctor,
          roles.patient,
        ]
      },
      emotionAutocomplete: {
        id: 'emotionAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.doctor,
        ],
      },
      emotionFind: {
        id: 'emotionFind',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.doctor,
          roles.patient,
        ],
      },
      emotionList: {
        id: 'emotionList',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.doctor,
          roles.patient,
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

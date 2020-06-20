const QuestionnaireService = require('../../../services/questionnaireService');
const QuizRecordService = require('../../../services/quizRecordService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  type UserWithRoles {
    id: String!
    fullName: String
    firstName: String
    lastName: String
    phoneNumber: String
    email: String!
    avatars: [File!]
    authenticationUid: String
    emailVerified: Boolean
    roles: [String!]!
    disabled: Boolean
    createdAt: DateTime
    updatedAt: DateTime
    settings: SettingsType

    favourites(filter: QuestionnaireFilterInput, limit: Int, offset: Int, orderBy: QuestionnaireOrderByEnum): QuestionnairePage!
    playedQuizes(filter: QuizRecordFilterInput, limit: Int, offset: Int, orderBy: QuizRecordOrderByEnum): QuizRecordPage!
    questionnaires(filter: QuestionnaireFilterInput, limit: Int, offset: Int, orderBy: QuestionnaireOrderByEnum): QuestionnairePage!
  }
`;

const resolver = {
  UserWithRoles: {
    roles: (instance) =>
      !instance.roles || !instance.roles.length
        ? ['learner']
        : instance.roles,

    favourites: async (root, args, context, info) => {
      new PermissionChecker(context).validateHas(
        permissions.public,
      );

      return new QuestionnaireService(
        context,
      ).findAndCountAll({
        ...args,
        filter: {
          ...args.filter,
          favourite: root.id,
        },
        requestedAttributes: graphqlSelectRequestedAttributes(
          info,
          'rows',
        ),
      });
    },
    playedQuizes: async (root, args, context, info) => {
      new PermissionChecker(context).validateHas(
        permissions.owner,
      );

      return new QuizRecordService(context).findAndCountAll(
        {
          ...args,
          filter: {
            ...args.filter,
            candidate: root.id,
          },
          requestedAttributes: graphqlSelectRequestedAttributes(
            info,
            'rows',
          ),
        },
      );
    },
    questionnaires: async (root, args, context, info) => {
      new PermissionChecker(context).validateHas(
        permissions.public,
      );

      return new QuestionnaireService(context).findAndCountAll(
        {
          ...args,
          filter: {
            ...args.filter,
            createdBy: root.id,
          },
          requestedAttributes: graphqlSelectRequestedAttributes(
            info,
            'rows',
          ),
        },
      );
    },
  },
};

exports.schema = schema;
exports.resolver = resolver;

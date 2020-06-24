const QuestionnaireService = require('../../../services/questionnaireService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  questionnaireFavourite(id: String!): Questionnaire!
`;

const resolver = {
  questionnaireFavourite: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.member,
    );

    return new QuestionnaireService(
      context,
    ).changeFavourites(args.id, args.data);
  },
};

exports.schema = schema;
exports.resolver = resolver;

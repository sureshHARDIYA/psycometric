const QuestionnaireService = require('../../../services/questionnaireService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  questionnaireDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  questionnaireDestroy: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.questionnaireDestroy);

    await new QuestionnaireService(context).destroyAll(
      args.ids
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;

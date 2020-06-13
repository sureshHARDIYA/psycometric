const QuestionService = require('../../../services/questionService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  questionDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  questionDestroy: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.questionDestroy,
    );

    await new QuestionService(context).destroyAll(args.ids);

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;

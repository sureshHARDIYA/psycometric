const QuestionService = require('../../../services/questionService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  questionImport(data: QuestionInput!, importHash: String!): Boolean
`;

const resolver = {
  questionImport: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.questionImport,
    );

    await new QuestionService(context).import(
      args.data,
      args.importHash,
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;

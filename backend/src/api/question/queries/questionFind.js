const QuestionService = require('../../../services/questionService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  questionFind(id: String!): Question!
`;

const resolver = {
  questionFind: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.public,
    );

    return new QuestionService(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;

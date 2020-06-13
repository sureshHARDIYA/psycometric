const QuestionService = require('../../../services/questionService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  questionUpdate(id: String!, data: QuestionInput!): Question!
`;

const resolver = {
  questionUpdate: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.questionEdit,
    );

    return new QuestionService(context).update(
      args.id,
      args.data,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;

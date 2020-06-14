const QuestionService = require('../../../services/questionService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  questionCreate(data: QuestionInput!): Question!
`;

const resolver = {
  questionCreate: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.questionCreate,
    );
    return { ...args.data, id: 1 };
    // return new QuestionService(context).create(args.data);
  },
};

exports.schema = schema;
exports.resolver = resolver;

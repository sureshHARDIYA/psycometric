const QuestionService = require('../../../services/questionService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  questionCreateQuestion(id: String!, data: QuestionInput!): Questionnaire
`;

const resolver = {
  questionCreateQuestion: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.questionCreate,
    );

    return new QuestionService(context).createQuestion(
      arg.id,
      args.data,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;

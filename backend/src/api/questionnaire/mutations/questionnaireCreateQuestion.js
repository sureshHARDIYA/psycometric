const QuestionnaireService = require('../../../services/questionnaireService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  questionnaireCreateQuestion(id: String!, data: QuestionInput!): Questionnaire
`;

const resolver = {
  questionnaireCreateQuestion: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.questionnaireCreate,
    );

    return new QuestionnaireService(context).createQuestion(
      arg.id,
      args.data,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;

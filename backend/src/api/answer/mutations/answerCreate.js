const AnswerService = require('../../../services/answerService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  answerCreate(questionnaire: ID!, data: AnswerInput!): Answer!
`;

const resolver = {
  answerCreate: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.questionnaireEdit,
    );

    return { ...args.data, id: 1 };
    // return new AnswerService(context).create(args.questionnaireId, args.data);
  },
};

exports.schema = schema;
exports.resolver = resolver;

const AnswerService = require('../../../services/answerService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  answerCreate(data: AnswerInput!): Answer!
`;

const resolver = {
  answerCreate: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.questionnaireEdit,
    );

    return new AnswerService(context).create(args.data);
  },
};

exports.schema = schema;
exports.resolver = resolver;

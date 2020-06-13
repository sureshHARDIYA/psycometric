const AnswerService = require('../../../services/answerService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  answerUpdate(id: String!, data: AnswerInput!): Answer!
`;

const resolver = {
  answerUpdate: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.questionnaireEdit,
    );

    return new AnswerService(context).update(
      args.id,
      args.data,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;

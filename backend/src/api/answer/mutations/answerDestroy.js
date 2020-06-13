const AnswerService = require('../../../services/answerService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  answerDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  answerDestroy: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.questionnaireDestroy,
    );

    await new AnswerService(context).destroyAll(args.ids);

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;

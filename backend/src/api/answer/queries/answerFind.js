const AnswerService = require('../../../services/answerService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  answerFind(id: String!): Answer!
`;

const resolver = {
  answerFind: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.public,
    );

    return new AnswerService(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;

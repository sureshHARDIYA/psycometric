const RuleService = require('../../../services/ruleService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  ruleDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  ruleDestroy: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.questionnaireDestroy,
    );

    await new RuleService(context).destroyAll(args.ids);

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;

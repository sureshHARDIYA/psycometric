const RuleService = require('../../../services/ruleService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  ruleUpdate(id: String!, data: RuleUpdateInput!): Rule!
`;

const resolver = {
  ruleUpdate: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.questionnaireEdit,
    );

    return new RuleService(context).update(
      args.id,
      args.data,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;

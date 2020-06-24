const RuleService = require('../../../services/ruleService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  ruleCreate(data: RuleInput!): Rule!
`;

const resolver = {
  ruleCreate: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.questionnaireEdit,
    );

    return new RuleService(context).create(args.data);
  },
};

exports.schema = schema;
exports.resolver = resolver;

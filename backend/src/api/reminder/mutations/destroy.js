const ReminderService = require('../../../services/reminderService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  reminderDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  reminderDestroy: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.reminderDestroy,
    );

    await new ReminderService(context).destroyAll(args.ids);

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;

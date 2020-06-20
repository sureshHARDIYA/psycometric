const ReminderService = require('../../../services/reminderService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  reminderImport(data: ReminderInput!, importHash: String!): Boolean
`;

const resolver = {
  reminderImport: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.reminderImport,
    );

    await new ReminderService(context).import(
      args.data,
      args.importHash,
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;

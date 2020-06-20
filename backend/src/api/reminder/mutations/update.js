const ReminderService = require('../../../services/reminderService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  reminderUpdate(id: String!, data: ReminderInput!): Reminder!
`;

const resolver = {
  reminderUpdate: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.reminderEdit,
    );

    return new ReminderService(context).update(
      args.id,
      args.data,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;

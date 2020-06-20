const ReminderService = require('../../../services/reminderService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  reminderCreate(data: ReminderInput!): Reminder!
`;

const resolver = {
  reminderCreate: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.reminderCreate,
    );
    return new ReminderService(context).create(args.data);
  },
};

exports.schema = schema;
exports.resolver = resolver;

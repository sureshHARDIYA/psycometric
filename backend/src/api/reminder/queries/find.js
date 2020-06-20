const ReminderService = require('../../../services/reminderService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  reminderFind(id: String!): Reminder!
`;

const resolver = {
  reminderFind: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.public,
    );

    return new ReminderService(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;

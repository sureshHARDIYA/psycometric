const ReminderService = require('../../../services/reminderService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  reminderList(filter: ReminderFilterInput, limit: Int, offset: Int, orderBy: ReminderOrderByEnum): ReminderPage!
`;

const resolver = {
  reminderList: async (root, args, context, info) => {
    new PermissionChecker(context).validateHas(
      permissions.public,
    );

    return new ReminderService(context).findAndCountAll({
      ...args,
      requestedAttributes: graphqlSelectRequestedAttributes(
        info,
        'rows',
      ),
    });
  },
};

exports.schema = schema;
exports.resolver = resolver;

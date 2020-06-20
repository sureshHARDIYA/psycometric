const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const ReminderService = require('../../../services/reminderService');

const schema = `
  reminderAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  reminderAutocomplete: async (
    root,
    args,
    context,
    info,
  ) => {
    new PermissionChecker(context).validateHas(
      permissions.reminderAutocomplete,
    );

    return new ReminderService(context).findAllAutocomplete(
      args.query,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;

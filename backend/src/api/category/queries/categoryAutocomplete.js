const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const CategoryService = require('../../../services/categoryService');

const schema = `
  categoryAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  categoryAutocomplete: async (
    root,
    args,
    context,
    info,
  ) => {
    new PermissionChecker(context).validateHas(
      permissions.categoryAutocomplete,
    );

    return new CategoryService(context).findAllAutocomplete(
      args.query,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;

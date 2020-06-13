const CategoryService = require('../../../services/categoryService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  categoryImport(data: CategoryInput!, importHash: String!): Boolean
`;

const resolver = {
  categoryImport: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.categoryImport,
    );

    await new CategoryService(context).import(
      args.data,
      args.importHash,
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;

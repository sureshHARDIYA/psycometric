const CategoryService = require('../../../services/categoryService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  categoryDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  categoryDestroy: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.categoryDestroy,
    );

    await new CategoryService(context).destroyAll(args.ids);

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;

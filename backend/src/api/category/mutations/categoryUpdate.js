const CategoryService = require('../../../services/categoryService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  categoryUpdate(id: String!, data: CategoryInput!): Category!
`;

const resolver = {
  categoryUpdate: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.categoryEdit,
    );

    return new CategoryService(context).update(
      args.id,
      args.data,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;

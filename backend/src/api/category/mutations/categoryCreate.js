const CategoryService = require('../../../services/categoryService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  categoryCreate(data: CategoryInput!): Category!
`;

const resolver = {
  categoryCreate: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.categoryCreate,
    );
    return new CategoryService(context).create(args.data);
  },
};

exports.schema = schema;
exports.resolver = resolver;

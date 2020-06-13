const CategoryService = require('../../../services/categoryService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  categoryFind(id: String!): Category!
`;

const resolver = {
  categoryFind: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.public,
    );

    return new CategoryService(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;

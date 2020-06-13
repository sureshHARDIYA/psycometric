const AuthService = require('../../../services/auth/authService');
const ForbiddenError = require('../../../errors/forbiddenError');

const schema = `
  authChangePassword(password: String!, newPassword: String!): String
`;

const resolver = {
  authChangePassword: async (root, args, context) => {
    if (!context.currentUser || !context.currentUser.id) {
      throw new ForbiddenError(context.language);
    }

    return AuthService.changePassword(
      args.password,
      args.newPassword,
      context,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;

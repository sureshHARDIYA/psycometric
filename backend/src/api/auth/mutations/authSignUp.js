const AuthService = require('../../../services/auth/authService');

const schema = `
  authSignUp(email: String!, password: String!, intrestedCategories: [String]): String
`;

const resolver = {
  authSignUp: async (root, args, context) => {
    return AuthService.signup(
      args.email,
      args.password,
      args.intrestedCategories,
      context,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;

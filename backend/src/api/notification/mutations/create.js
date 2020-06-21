const _get = require('lodash/get');
const NotificationService = require('../../../services/notificationService');

const schema = `
  notificationCreate(token: String): Boolean!
`;

const resolver = {
  notificationCreate: async (root, args, context) => {
    const data = {
      token: args.token,
      user: _get(context, 'currentUser.id', '')
    }

    await new NotificationService(context).create(data);
    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;

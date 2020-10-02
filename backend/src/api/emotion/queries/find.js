const EmotionService = require('../../../services/emotionService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
    .values;

const schema = `
  emotionFind(id: String!): Emotion!
`;

const resolver = {
    emotionFind: async (root, args, context) => {
        new PermissionChecker(context).validateHas(
            permissions.public,
        );

        return new EmotionService(context).findById(args.id);
    },
};

exports.schema = schema;
exports.resolver = resolver;

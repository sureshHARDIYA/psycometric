const EmotionService = require('../../../services/emotionService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
    .values;

const schema = `
  emotionCreate(data: EmotionInput!): Emotion!
`;

const resolver = {
    emotionCreate: async (root, args, context) => {
        new PermissionChecker(context).validateHas(
            permissions.questionnaireCreate,
        );
        return new EmotionService(context).create(args.data);
    },
};

exports.schema = schema;
exports.resolver = resolver;

const EmotionService = require('../../../services/emotionService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
    .values;

const schema = `
  emotionUpdate(id: String!, data: EmotionInput!): Emotion!
`;

const resolver = {
    emotionUpdate: async (root, args, context) => {
        new PermissionChecker(context).validateHas(
            permissions.questionnaireEdit,
        );

        return new EmotionService(context).update(
            args.id,
            args.data,
        );
    },
};

exports.schema = schema;
exports.resolver = resolver;

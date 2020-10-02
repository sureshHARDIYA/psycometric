const EmotionService = require('../../../services/emotionService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
    .values;

const schema = `
  questionnaireUpdate(id: String!, data: EmotionInput!): Emotion!
`;

const resolver = {
    questionnaireUpdate: async (root, args, context) => {
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

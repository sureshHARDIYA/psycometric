const EmotionService = require('../../../services/emotionService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
    .values;

const schema = `
  emotionImport(data: EmotionInput!, importHash: String!): Boolean
`;

const resolver = {
    emotionImport: async (root, args, context) => {
        new PermissionChecker(context).validateHas(
            permissions.questionnaireImport,
        );

        await new EmotionService(context).import(
            args.data,
            args.importHash,
        );

        return true;
    },
};

exports.schema = schema;
exports.resolver = resolver;

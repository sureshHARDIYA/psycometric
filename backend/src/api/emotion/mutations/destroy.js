const EmotionService = require('../../../services/emotionService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
    .values;

const schema = `
  questionnaireDestroy(ids: [String!]!): Boolean
`;

const resolver = {
    questionnaireDestroy: async (root, args, context) => {
        new PermissionChecker(context).validateHas(
            permissions.questionnaireDestroy,
        );

        await new EmotionService(context).destroyAll(args.ids);

        return true;
    },
};

exports.schema = schema;
exports.resolver = resolver;
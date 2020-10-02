const EmotionService = require('../../../services/emotionService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
    .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  emotionList(filter: EmotionFilterInput, limit: Int, offset: Int, orderBy: EmotionOrderByEnum): EmotionPage!
`;

const resolver = {
    emotionList: async (root, args, context, info) => {
        new PermissionChecker(context).validateHas(
            permissions.public,
        );

        return new EmotionService(context).findAndCountAll({
            ...args,
            requestedAttributes: graphqlSelectRequestedAttributes(
                info,
                'rows',
            ),
        });
    },
};

exports.schema = schema;
exports.resolver = resolver;
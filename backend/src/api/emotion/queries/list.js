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
            permissions.emotionList,
        );

        return new EmotionService(context).findAndCountAll({
            ...args,
            filter: { ...args.filter, createdBy: context.currentUser.id, roles: context.currentUser.roles},
            requestedAttributes: graphqlSelectRequestedAttributes(
                info,
                'rows',
            ),
        });
    },
};

exports.schema = schema;
exports.resolver = resolver;
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
    .values;
const EmotionService = require('../../../services/emotionService');

const schema = `
  emotionAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
    emotionAutocomplete: async (
        root,
        args,
        context,
        info,
    ) => {
        new PermissionChecker(context).validateHas(
            permissions.questionnaireAutocomplete,
        );

        return new EmotionService(context).findAllAutocomplete(
            args.query,
            args.limit,
        );
    },
};

exports.schema = schema;
exports.resolver = resolver;

const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const QuestionService = require('../../../services/questionnaireService');

const schema = `
  quizRecordAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  quizRecordAutocomplete: async (root, args, context, info) => {
    new PermissionChecker(context).validateHas(
      permissions.quizRecordAutocomplete,
    );

    return new QuestionService(context).findAllAutocomplete(
      args.query,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;

const QuestionnaireService = require('../../../services/questionnaireService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  questionnaireImport(data: QuestionnaireInput!, importHash: String!): Boolean
`;

const resolver = {
  questionnaireImport: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.questionnaireImport);

    await new QuestionnaireService(context).import(
      args.data,
      args.importHash
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;

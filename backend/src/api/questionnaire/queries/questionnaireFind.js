const QuestionnaireService = require('../../../services/questionnaireService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  questionnaireFind(id: String!): Questionnaire!
`;

const resolver = {
  questionnaireFind: (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.public,
    );

    return new QuestionnaireService(context).findById(
      args.id,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;

const QuestionnaireService = require('../../../services/questionnaireService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  questionnaireList(filter: QuestionnaireFilterInput, limit: Int, offset: Int, orderBy: QuestionnaireOrderByEnum): QuestionnairePage!
`;

const resolver = {
  questionnaireList: async (root, args, context, info) => {
    new PermissionChecker(context).validateHas(
      permissions.public,
    );

    return new QuestionnaireService(
      context,
    ).findAndCountAll({
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

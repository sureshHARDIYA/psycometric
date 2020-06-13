const QuizRecordService = require('../../../services/quizRecordService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  quizRecordList(filter: QuizRecordFilterInput, limit: Int, offset: Int): QuizRecordPage!
`;

const resolver = {
  quizRecordList: async (root, args, context, info) => {
    new PermissionChecker(context).validateHas(
      permissions.quizRecordRead,
    );

    return new QuizRecordService(context).findAndCountAll({
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

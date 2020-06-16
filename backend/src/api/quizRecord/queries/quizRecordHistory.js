const QuizRecordService = require('../../../services/quizRecordService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  quizRecordHistory(filter: QuizRecordFilterInput, limit: Int, offset: Int): QuizRecordPage!
`;

const resolver = {
  quizRecordHistory: async (root, args, context, info) => {
    new PermissionChecker(context).validateHas(
      permissions.public,
    );

    return new QuizRecordService(context).findAndCountAll({
      ...args,
      filter: {
        ...(args.filter || {}),
        // candidate: context.currentUser.id
      },
      requestedAttributes: graphqlSelectRequestedAttributes(
        info,
        'rows',
        'max',
      ),
    });
  },
};

exports.schema = schema;
exports.resolver = resolver;

const QuizRecordService = require('../../../services/quizRecordService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  quizRecordFind(id: String!): QuizRecord!
`;

const resolver = {
  questionFind: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.quizRecordRead,
    );

    return new QuizRecordService(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;

const QuizRecordService = require('../../../services/quizRecordService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  quizRecordCreate(data: QuizRecordInput!): QuizRecord!
`;

const resolver = {
  quizRecordCreate: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.member,
    );
    return new QuizRecordService(context).create(args.data);
  },
};

exports.schema = schema;
exports.resolver = resolver;

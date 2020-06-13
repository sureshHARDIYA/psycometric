const FeedbackService = require('../../../services/feedbackService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  feedbackList(filter: FeedbackFilterInput, limit: Int, offset: Int, orderBy: FeedbackListOrderByEnum): FeedbackPage!
`;

const resolver = {
  feedbackList: async (root, args, context, info) => {
    new PermissionChecker(context).validateHas(
      permissions.feedbackRead,
    );

    return new FeedbackService(context).findAndCountAll({
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

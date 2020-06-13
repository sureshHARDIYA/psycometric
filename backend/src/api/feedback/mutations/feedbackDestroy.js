const FeedbackService = require('../../../services/feedbackService');

const schema = `
  feedbackDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  feedbackDestroy: async (root, args, context) => {
    await new FeedbackService(context).destroyAll(args.ids);

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;

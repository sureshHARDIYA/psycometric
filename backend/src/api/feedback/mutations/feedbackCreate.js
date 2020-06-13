const FeedbackService = require('../../../services/feedbackService');

const schema = `
  feedbackCreate(data: FeedbackInput!): Feedback!
`;

const resolver = {
  feedbackCreate: async (root, args, context) => {
    return new FeedbackService(context).create(args.data);
  },
};

exports.schema = schema;
exports.resolver = resolver;

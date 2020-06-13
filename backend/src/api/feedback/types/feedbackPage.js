const schema = `
  type FeedbackPage {
    rows: [Feedback!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;

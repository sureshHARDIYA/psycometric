const schema = `
  input EmotionInput {
    emotion: String!
    degree: String!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;

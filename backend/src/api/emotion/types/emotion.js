const schema = `
  type Emotion {
    id: String!
    emotion: String!
    degree: String!
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
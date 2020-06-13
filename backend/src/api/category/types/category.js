const schema = `
  type Category {
    id: String!
    name: String
    description: String
    questionnaires: [Questionnaire]
    createdAt: DateTime
    updatedAt: DateTime
    featuredImage: [File!]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;

const schema = `
  input RuleInput {
    max: Int
    min: Int
    message: String!
    questionnaire: String!
  }

  input RuleUpdateInput {
    max: Int
    min: Int
    message: String
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;

const schema = `
  enum QuizRecordOrderByEnum {
    id_ASC
    id_DESC
    name_ASC
    name_DESC
    description_ASC
    description_DESC
    status_ASC
    status_DESC
    availableFrom_ASC
    availableFrom_DESC
    createdAt_ASC
    createdAt_DESC
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;

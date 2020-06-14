const schema = `
  enum QuestionOrderByEnum {
    id_ASC
    id_DESC
    title_ASC
    title_DESC
    status_ASC
    status_DESC
    createdAt_ASC
    createdAt_DESC
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;

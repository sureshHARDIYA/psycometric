const schema = `
  enum QuestionnaireOrderByEnum {
    id_ASC
    id_DESC
    name_ASC
    name_DESC
    description_ASC
    description_DESC
    status_ASC
    status_DESC
    views_ASC
    views_DESC
    createdAt_ASC
    createdAt_DESC
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;

const schema = `
  enum EmotionOrderByEnum {
    id_ASC
    id_DESC
    createdAt_ASC
    createdAt_DESC
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
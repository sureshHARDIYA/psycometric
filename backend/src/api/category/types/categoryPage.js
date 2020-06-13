const schema = `
  type CategoryPage {
    rows: [Category!]!
    count: Int!
    offset: Int
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;

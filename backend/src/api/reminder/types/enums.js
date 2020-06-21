const schema = `
  enum Frequency {
    WEEKLY
    BIWEEKLY
    MONTHLY
  }

  enum Audience {
    ALL
    USER
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;

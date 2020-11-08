const schema = `
  enum Frequency {
    ONCE
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

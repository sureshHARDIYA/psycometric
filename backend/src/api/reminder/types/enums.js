const schema = `
  enum Frequency {
    WEEKLY
    BIWEEKLY
    MONTHLY
  }

  enum Audience {
    ALL
    SELECT
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;

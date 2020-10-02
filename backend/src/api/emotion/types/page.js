const schema = `
  type EmotionPage {
    rows: [Emotion!]!
    count: Int!
    offset: Int
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;

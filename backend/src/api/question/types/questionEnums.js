const schema = `
  enum AnswerTypeEnum {
    CODE
    PICTURE
    TEXT
  }

  enum QuestionTypeEnum {
    SINGLE
    MULTIPLE
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;

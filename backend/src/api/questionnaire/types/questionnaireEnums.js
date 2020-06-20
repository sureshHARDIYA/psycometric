const schema = `
  enum QuestionnaireStatusEnum {
    ACTIVE
    INACTIVE
    DRAFT
  }

  enum LevelEnum {
    JUNIOR
    BEGINNER
    INTERMEDIATE
    SENIOR
    EXPERT
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;

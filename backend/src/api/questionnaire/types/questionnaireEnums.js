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

  enum Frequency {
    EVERYDAY
    EVERYWEEK
    TWICEAWEEK
    EVERYMONTH
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;

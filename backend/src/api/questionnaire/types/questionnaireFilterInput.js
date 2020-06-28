const schema = `
  input QuestionnaireFilterInput {
    id: String
    name: String
    assgined: String

    level: LevelEnum
    description: String
    status: QuestionnaireStatusEnum
    availableFromRange: [ String ]
    createdAtRange: [ DateTime ]
    createdBy: String
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;

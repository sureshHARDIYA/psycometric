const schema = `
  input QuestionnaireFilterInput {
    id: String
    name: String
    level: LevelEnum
    description: String
    status: QuestionnaireStatusEnum
    availableFromRange: [ String ]
    createdAtRange: [ DateTime ]
    createdBy: String
    category: [ String ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;

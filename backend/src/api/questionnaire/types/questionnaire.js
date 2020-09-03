const schema = `
  type Questionnaire {
    id: String!
    name: String
    description: String
    status: QuestionnaireStatusEnum
    answers: [Answer]
    rules: [Rule]
    questions: [Question]
    availableFrom: String
    level: LevelEnum
    createdAt: DateTime
    updatedAt: DateTime
    favourited: Boolean
    favourites: [Favourite]
    createdBy: User
    views: Int
    test: String
    schedule: DateTime
    frequency: Frequency
    audience: Audience
    audienceList: [String]
  }

  type Favourite {
    user: User
    createdAt: DateTime
  }
`;

const resolver = {
  Questionnaire: {
    favourited: (root, _, context) => {
      if (!context.currentUser) {
        return false;
      }

      return root.favourites.some(
        ({ user }) => user.id === context.currentUser.id,
      );
    },
    test: (root) => root.test || 'no',
  },
};

exports.schema = schema;
exports.resolver = resolver;

const schema = `
  type Questionnaire {
    id: String!
    name: String
    description: String
    status: QuestionnaireStatusEnum
    answers: [Answer]
    questions: [Question]
    availableFrom: String
    level: LevelEnum
    category: Category
    createdAt: DateTime
    updatedAt: DateTime
    favourited: Boolean
    favourites: [Favourite]
    createdBy: User
    views: Int
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
  },
};

exports.schema = schema;
exports.resolver = resolver;

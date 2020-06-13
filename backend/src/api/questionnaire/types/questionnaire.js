const schema = `
  type Questionnaire {
    id: String!
    name: String
    description: String
    status: QuestionnaireStatusEnum
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
    type: QuestionnaireType
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

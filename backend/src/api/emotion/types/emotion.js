const schema = `
  type Emotion {
    id: String
    emotion: String
    degree: String
    createdBy: User
    createdAt: DateTime
    updatedAt: DateTime
  }
`

const resolver = {}

exports.schema = schema
exports.resolver = resolver

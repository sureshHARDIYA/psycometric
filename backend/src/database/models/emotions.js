const database = require('../database')
const Schema = database.Schema

const EmotionSchema = new Schema(
  {
    emotion: { type: String, required: true },
    degree: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'user' }
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true, virtuals: true }
  }
)

        toObject: {getters: true},
module.exports = database.model('emotion', EmotionSchema)

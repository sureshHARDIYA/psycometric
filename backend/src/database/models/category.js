const database = require('../database');
const Schema = database.Schema;
const { FileSchema } = require('./file');

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'user' },
    featuredImage: [FileSchema],
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true, virtuals: true },
  },
);

categorySchema.virtual('questionnaires', {
  ref: 'questionnaire',
  localField: '_id',
  foreignField: 'category',
});

const Category = database.model('category', categorySchema);

module.exports = Category;

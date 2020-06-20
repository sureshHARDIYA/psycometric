const database = require('../database');
const Schema = database.Schema;
const { FileSchema } = require('./file');

const UserSchema = new Schema(
  {
    postStatus: { type: String, minlength: 20 },
    firstName: { type: String, maxlength: 80 },
    lastName: { type: String, maxlength: 175 },
    email: {
      type: String,
      maxlength: 255,
      index: { unique: true },
    },
    authenticationUid: { type: String, maxlength: 255 },
    password: { type: String, maxlength: 255 },
    emailVerified: { type: Boolean, default: true },
    emailVerificationToken: {
      type: String,
      maxlength: 255,
    },
    emailVerificationTokenExpiresAt: { type: Date },
    passwordResetToken: {
      type: String,
      maxlength: 255,
    },
    passwordResetTokenExpiresAt: { type: Date },
    disabled: { type: Boolean, default: false },
    avatars: [FileSchema],
    roles: [{ type: String, default: 'learner' }],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    settings: {
      newQuestionnaireAlert: {
        type: Boolean,
        default: true,
      },
      remindersAlert: {
        type: Boolean,
        default: true,
      },
    },
    importHash: { type: String, maxlength: 255 },
  },
  {
    timestamps: true,
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true },
  },
);

// user.favourites = Questionnaire.find({ favourites.user: user._id }
UserSchema.virtual('favourites', {
  ref: 'questionnaire',
  localField: '_id',
  foreignField: 'favourites.user',
});

UserSchema.virtual('playedQuizes', {
  ref: 'quizRecord',
  localField: '_id',
  foreignField: 'candidate',
});

UserSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

UserSchema.pre('save', function(next) {
  if (!this.roles || !this.roles.length) {
    this.roles = ['learner'];
  }

  next();
});

const User = database.model('user', UserSchema);

module.exports = User;

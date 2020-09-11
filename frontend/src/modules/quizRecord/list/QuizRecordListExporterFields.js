import model from 'modules/quizRecord/QuizRecordModel';

const { fields } = model;

export default [
  fields.id,
  fields.title,
  // fields.randomizeQuestion,
  // fields.questionnaire,
  fields.total,
  fields.score,
  fields.duration,
  // fields.questions,
  // fields.candidate,
  fields.createdAt,
  fields.updatedAt,
];

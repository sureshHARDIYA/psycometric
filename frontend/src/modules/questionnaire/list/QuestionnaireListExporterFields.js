import model from 'modules/questionnaire/QuestionnaireModel';

const { fields } = model;

export default [
  fields.id,
  fields.name,
  fields.description,
  fields.status,
  fields.level,
  fields.category,
  fields.createdAt,
  fields.updatedAt,
];

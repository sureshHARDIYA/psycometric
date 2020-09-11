import model from 'modules/questionnaire/QuestionnaireModel';

const { fields } = model;

export default [
  fields.id,
  fields.name,
  fields.description,
  fields.status,
  fields.frequency,
  fields.views,
  fields.createdAt,
  fields.updatedAt,
];

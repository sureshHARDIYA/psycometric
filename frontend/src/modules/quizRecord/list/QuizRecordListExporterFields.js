import model from 'modules/questionnaire/QuestionnaireModel';

const { fields } = model;

export default [
  fields.id,
  fields.name,
  fields.description,
  fields.status,
  fields.featuredImage,
  fields.modules,
  fields.availableFrom,
  fields.createdAt,
  fields.updatedAt,
];

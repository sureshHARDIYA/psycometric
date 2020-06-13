import model from 'modules/questionnaire/QuestionnaireModel';

const { fields } = model;

export default [
  fields.name,
  fields.description,
  fields.status,
  fields.featuredImage,
  fields.modules,
];

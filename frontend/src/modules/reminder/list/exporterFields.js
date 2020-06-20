import model from 'modules/reminder/model';

const { fields } = model;

export default [
  fields.id,
  fields.name,
  fields.description,
  fields.createdAt,
  fields.updatedAt,
];

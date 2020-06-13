import model from 'modules/category/categoryModel';

const { fields } = model;

export default [
  fields.id,
  fields.name,
  fields.description,
  fields.createdAt,
  fields.updatedAt,
];

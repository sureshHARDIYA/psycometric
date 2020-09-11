import model from 'modules/auth/userModel';

const { fields } = model;

export default [
  fields.email,
  fields.firstName,
  fields.lastName,
  fields.avatarsIam,
  fields.roles,
];

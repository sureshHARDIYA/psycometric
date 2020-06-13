import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import StringField from 'modules/shared/fields/stringField';

function label(name) {
  return i18n(`entities.feedback.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  email: new StringField('email', label('email'), {
    email: true,
    required: true,
  }),
  message: new StringField(
    'message',
    label('message'),
    {
      required: true,
    },
  ),
  createdAt: new DateTimeField(
    'createdAt',
    label('createdAt'),
  ),
  updatedAt: new DateTimeField(
    'updatedAt',
    label('updatedAt'),
  ),
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    label('createdAtRange'),
  ),
};

export default { fields };

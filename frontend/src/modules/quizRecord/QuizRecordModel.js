import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import StringField from 'modules/shared/fields/stringField';
import RelationToOneField from 'modules/shared/fields/relationToOneField';

function label(name) {
  return i18n(`entities.questionnaire.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  title: new StringField('title', label('title'), {
    required: true,
  }),
  score: new StringField('score', label('score'), {}),
  duration: new StringField(
    'duration',
    label('duration'),
    {},
  ),
  total: new StringField('total', label('total'), {}),
  createdBy: new RelationToOneField(
    'createdBy',
    label('createdBy'),
    {},
  ),
  createdAt: new DateTimeField(
    'createdAt',
    label('createdAt'),
  ),
  updatedAt: new DateTimeField(
    'updatedAt',
    label('updatedAt'),
  ),
};

export default { fields };

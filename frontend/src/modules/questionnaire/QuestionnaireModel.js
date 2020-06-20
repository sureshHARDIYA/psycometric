import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import StringField from 'modules/shared/fields/stringField';
import EnumeratorField from 'modules/shared/fields/enumeratorField';
import RelationToOneField from 'modules/shared/fields/relationToOneField';

function label(name) {
  return i18n(`entities.questionnaire.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(
    `entities.questionnaire.enumerators.${name}.${value}`,
  );
}

const fields = {
  id: new IdField('id', label('id')),
  name: new StringField('name', label('name'), {
    required: true,
  }),
  views: new StringField('views', label('views'), {}),
  description: new StringField(
    'description',
    label('description'),
    {},
  ),
  frequency: new EnumeratorField(
    'frequency',
    label('frequency'),
    [
      {
        id: 'WEEKLY',
        label: enumeratorLabel('frequency', 'WEEKLY'),
      },
      {
        id: 'BIWEEKLY',
        label: enumeratorLabel('frequency', 'BIWEEKLY'),
      },
      {
        id: 'MONTHLY',
        label: enumeratorLabel('frequency', 'MONTHLY'),
      },
    ],
    { required: true },
  ),
  status: new EnumeratorField(
    'status',
    label('status'),
    [
      {
        id: 'ACTIVE',
        label: enumeratorLabel('status', 'ACTIVE'),
      },
      {
        id: 'INACTIVE',
        label: enumeratorLabel('status', 'INACTIVE'),
      },
      {
        id: 'DRAFT',
        label: enumeratorLabel('status', 'DRAFT'),
      },
    ],
    { required: true },
  ),
  level: new EnumeratorField(
    'level',
    label('level'),
    [
      {
        id: 'JUNIOR',
        label: enumeratorLabel('levels', 'JUNIOR'),
      },
      {
        id: 'BEGINNER',
        label: enumeratorLabel('levels', 'BEGINNER'),
      },
      {
        id: 'INTERMEDIATE',
        label: enumeratorLabel('levels', 'INTERMEDIATE'),
      },
      {
        id: 'SENIOR',
        label: enumeratorLabel('levels', 'SENIOR'),
      },
      {
        id: 'EXPERT',
        label: enumeratorLabel('levels', 'EXPERT'),
      },
    ],
    { required: true },
  ),
  category: new RelationToOneField(
    'category',
    label('category'),
    { required: true },
  ),
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
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    label('createdAtRange'),
  ),
};

export default { fields };

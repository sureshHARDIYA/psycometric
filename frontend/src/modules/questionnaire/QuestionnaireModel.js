import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import StringField from 'modules/shared/fields/stringField';
import EnumeratorField from 'modules/shared/fields/enumeratorField';
import RelationToOneField from 'modules/shared/fields/relationToOneField';
import RelationToManyField from 'modules/shared/fields/relationToManyField';

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
  schedule: new DateTimeField(
    'schedule',
    label('schedule'),
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
    {},
  ),
  test: new EnumeratorField(
    'test',
    label('test'),
    [
      {
        id: 'yes',
        label: enumeratorLabel('test', 'yes'),
      },
      {
        id: 'no',
        label: enumeratorLabel('test', 'no'),
      },
    ],
    {},
  ),
  audience: new EnumeratorField(
    'audience',
    label('audience'),
    [
      {
        id: 'ALL',
        label: enumeratorLabel('audience', 'ALL'),
      },
      {
        id: 'USER',
        label: enumeratorLabel('audience', 'USER'),
      },
    ],
    {},
  ),
  audienceList: new RelationToManyField(
    'audienceList',
    label('audienceList'),
    {},
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

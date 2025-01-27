import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import StringField from 'modules/shared/fields/stringField';
import EnumeratorField from 'modules/shared/fields/enumeratorField';
import RelationToManyField from 'modules/shared/fields/relationToManyField';

const label = (name) =>
  i18n(`entities.reminder.fields.${name}`);

const enumeratorLabel = (name, value) =>
  i18n(`entities.reminder.enumerators.${name}.${value}`);

const fields = {
  id: new IdField('id', label('id')),
  title: new StringField('title', label('title'), {
    required: true,
  }),
  message: new StringField('message', label('message'), {
    required: true,
  }),
  schedule: new DateTimeField(
    'schedule',
    label('schedule'),
  ),
  frequency: new EnumeratorField(
    'frequency',
    label('frequency'),
    [
      {
        id: 'ONCE',
        label: enumeratorLabel('frequency', 'ONCE'),
      },
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

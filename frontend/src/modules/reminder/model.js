import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateField from 'modules/shared/fields/dateField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import StringField from 'modules/shared/fields/stringField';
import EnumeratorField from 'modules/shared/fields/enumeratorField';
import RelationToManyField from 'modules/shared/fields/relationToManyField';
import RelationToOneField from 'modules/shared/fields/relationToOneField';

const label = (name) => i18n(`entities.reminder.fields.${name}`);

const enumeratorLabel = (name, value) => i18n(`entities.reminder.enumerators.${name}.${value}`);

const fields = {
  id: new IdField('id', label('id')),
  title: new StringField('title', label('title'), {
    required: true,
  }),
  message: new StringField(
    'message',
    label('message'),
    { required: true, },
  ),
  schedule: new DateField(
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
  questionnaire: new RelationToOneField(
    'questionnaire',
    label('questionnaire'), {
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
};

export default { fields };

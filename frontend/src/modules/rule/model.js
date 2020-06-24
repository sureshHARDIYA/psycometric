import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import StringField from 'modules/shared/fields/stringField';
import IntegerField from 'modules/shared/fields/integerField';

const label = name => i18n(
  `entities.questionnaire.rule.fields.${name}`,
);

const fields = {
  id: new IdField('id', label('id')),
  message: new StringField('message', label('message'), {
    required: true,
  }),
  min: new IntegerField('min', label('min'), {}),
  max: new IntegerField('max', label('max'), {}),
};

export default { fields };

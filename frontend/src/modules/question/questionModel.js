import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import StringField from 'modules/shared/fields/stringField';

function label(name) {
  return i18n(
    `entities.questionnaire.question.fields.${name}`,
  );
}

const fields = {
  id: new IdField('id', label('id')),
  title: new StringField('title', label('title'), {
    required: true,
  }),
};

export default { fields };

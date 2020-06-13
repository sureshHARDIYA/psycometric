import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import StringField from 'modules/shared/fields/stringField';
import IntegerField from 'modules/shared/fields/integerField';
import BooleanField from 'modules/shared/fields/booleanField';
import EnumeratorField from 'modules/shared/fields/enumeratorField';

function label(name) {
  return i18n(
    `entities.questionnaire.answer.fields.${name}`,
  );
}

function enumeratorLabel(name, value) {
  return i18n(
    `entities.questionnaire.answer.enumerators.${name}.${value}`,
  );
}

const fields = {
  id: new IdField('id', label('id')),
  title: new StringField('title', 'Title', {
    required: true,
  }),
  score: new IntegerField('score', 'Score', {
    required: true,
  }),
  isCorrect: new BooleanField(
    'isCorrect',
    label('isCorrect'),
  ),
  answerType: new EnumeratorField(
    'answerType',
    label('answerType'),
    [
      {
        id: 'CODE',
        label: enumeratorLabel('answerType', 'CODE'),
      },
      {
        id: 'PICTURE',
        label: enumeratorLabel('answerType', 'PICTURE'),
      },
      {
        id: 'TEXT',
        label: enumeratorLabel('answerType', 'TEXT'),
      },
    ],
    { required: false },
  ),
};

export default { fields };

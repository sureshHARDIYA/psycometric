import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import StringField from 'modules/shared/fields/stringField';
import IntegerField from 'modules/shared/fields/integerField';
import BooleanField from 'modules/shared/fields/booleanField';
import EnumeratorField from 'modules/shared/fields/enumeratorField';
import ShapeArrayField from 'modules/shared/fields/shapeArrayField';

function label(name) {
  return i18n(
    `entities.questionnaire.question.fields.${name}`,
  );
}

function enumeratorLabel(name, value) {
  return i18n(
    `entities.questionnaire.question.enumerators.${name}.${value}`,
  );
}

const fields = {
  id: new IdField('id', label('id')),
  title: new StringField('title', label('title'), {
    required: true,
  }),
  explainAnswer: new StringField(
    'explainAnswer',
    label('explainAnswer'),
    {
      required: true,
    },
  ),
  questionType: new EnumeratorField(
    'questionType',
    label('questionType'),
    [
      {
        id: 'SINGLE',
        label: enumeratorLabel('questionType', 'SINGLE'),
      },
      {
        id: 'MULTIPLE',
        label: enumeratorLabel('questionType', 'MULTIPLE'),
      },
    ],
    { required: false },
  ),
  answers: new ShapeArrayField(
    'answers',
    label('answers'),
    {
      id: new IdField('id', label('id')),
      title: new StringField('answers.title', 'Title', {
        required: true,
      }),
      score: new IntegerField('answers.score', 'Score', {
        required: false,
      }),
      isCorrect: new BooleanField(
        'isCorrect',
        label('isCorrect'),
      ),
      answerType: new EnumeratorField(
        'answers.answerType',
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
    },
  ),
};

export default { fields };

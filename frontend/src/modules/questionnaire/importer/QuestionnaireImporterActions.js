import { i18n } from 'i18n';
import importerActions from 'modules/shared/importer/importerActions';
import QuestionnaireService from 'modules/questionnaire/QuestionnaireService';
import fields from 'modules/questionnaire/importer/QuestionnaireImporterFields';
import selectors from 'modules/questionnaire/importer/QuestionnaireImporterSelectors';

export default importerActions(
  'QUESTIONNAIRE_IMPORTER',
  selectors,
  QuestionnaireService.import,
  fields,
  i18n('entities.quesionnaire.importer.fileName'),
);

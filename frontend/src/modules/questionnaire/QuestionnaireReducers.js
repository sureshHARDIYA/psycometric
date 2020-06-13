import { combineReducers } from 'redux';
import list from 'modules/questionnaire/list/QuestionnaireListReducers';
import form from 'modules/questionnaire/form/QuestionnaireFormReducers';
import view from 'modules/questionnaire/view/QuestionnaireViewReducers';
import destroy from 'modules/questionnaire/destroy/QuestionnaireDestroyReducers';
import importerReducer from 'modules/questionnaire/importer/QuestionnaireImporterReducers';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});

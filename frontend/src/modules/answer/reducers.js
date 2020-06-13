import list from 'modules/questionnaire/list/QuestionnaireListReducers';
import importerReducer from 'modules/questionnaire/importer/QuestionnaireImporterReducers';

// Already fixed
import view from 'modules/question/view/QuestionViewReducers';
import { combineReducers } from 'redux';
import form from 'modules/question/form/questionReducers';
import destroy from 'modules/question/destroy/questionDestroyReducers';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});

import { combineReducers } from 'redux';
import list from 'modules/feedback/list/feedbackListReducers';
import form from 'modules/feedback/form/feedbackFormReducers';
import destroy from 'modules/feedback/destroy/feedbackDestroyReducers';

export default combineReducers({
  list,
  form,
  destroy,
});

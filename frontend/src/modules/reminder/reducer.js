import { combineReducers } from 'redux';
import list from 'modules/reminder/list/reducers';
import destroy from 'modules/reminder/destroy/reducer';
import form from 'modules/reminder/form/reducer';
import view from 'modules/reminder/view/reducer';

export default combineReducers({
  list,
  destroy,
  form,
  view,
});

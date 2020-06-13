import { combineReducers } from 'redux';
import list from 'modules/category/list/categoryListReducers';
import destroy from 'modules/category/destroy/categoryDestroyReducers';
import form from 'modules/category/form/categoryFormReducers';
import view from 'modules/category/view/categoryViewReducers';

export default combineReducers({
  list,
  destroy,
  form,
  view,
});

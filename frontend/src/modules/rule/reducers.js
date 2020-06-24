import { combineReducers } from 'redux';

import form from 'modules/rule/form/reducers';
import view from 'modules/rule/view/reducers';
import destroy from 'modules/rule/destroy/reducers';

export default combineReducers({
  form,
  view,
  destroy,
});

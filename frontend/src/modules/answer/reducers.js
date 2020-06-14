import { combineReducers } from 'redux';

import form from 'modules/answer/form/reducers';
import view from 'modules/answer/view/reducers';
import destroy from 'modules/answer/destroy/reducers';

export default combineReducers({
  form,
  view,
  destroy,
});

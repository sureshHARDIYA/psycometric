import listActions from 'modules/questionnaire/list/QuestionnaireListActions';
import QuestionnaireService from 'modules/questionnaire/QuestionnaireService';
import Errors from 'modules/shared/error/errors';
import { i18n } from 'i18n';
import { getHistory } from 'modules/store';
import Message from 'view/shared/message';

const prefix = 'QUESTIONNAIRE_DESTROY';

const actions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,
  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,
  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({ type: actions.DESTROY_STARTED });

      await QuestionnaireService.destroyAll([id]);

      dispatch({ type: actions.DESTROY_SUCCESS });

      Message.success(
        i18n('entities.questionnaire.destroy.success'),
      );

      getHistory().push('/questionnaire');
    } catch (error) {
      Errors.handle(error);

      dispatch({ type: actions.DESTROY_ERROR });
    }
  },
  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({ type: actions.DESTROY_ALL_STARTED });

      await QuestionnaireService.destroyAll(ids);

      dispatch({ type: actions.DESTROY_ALL_SUCCESS });

      if (listActions) {
        dispatch(listActions.doChangeSelected([]));
      }

      Message.success(
        i18n('entities.questionnaire.destroyAll.success'),
      );

      getHistory().push('/questionnaire');
    } catch (error) {
      Errors.handle(error);

      dispatch({ type: actions.DESTROY_ALL_ERROR });
    }
  },
};

export default actions;

import QuestionnaireService from 'modules/questionnaire/QuestionnaireService';
import Errors from 'modules/shared/error/errors';
import { getHistory } from 'modules/store';

const prefix = 'QUESTIONNAIRE_VIEW';

const actions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: actions.FIND_STARTED,
      });

      const record = await QuestionnaireService.find(id);

      dispatch({
        type: actions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.FIND_ERROR,
      });

      getHistory().push('/questionnaire');
    }
  },

  doRefresh: (id) => async (dispatch) => {
    try {
      const record = await QuestionnaireService.find(id);

      dispatch({
        type: actions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.FIND_ERROR,
      });

      getHistory().push('/questionnaire');
    }
  },
};

export default actions;

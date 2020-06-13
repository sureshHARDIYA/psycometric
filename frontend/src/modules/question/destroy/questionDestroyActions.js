import { i18n } from 'i18n';
import Message from 'view/shared/message';
import { getHistory } from 'modules/store';
import Errors from 'modules/shared/error/errors';
import QuestionService from 'modules/question/questionService';
import listActions from 'modules/questionnaire/list/QuestionnaireListActions';

const prefix = 'QUESTION_DESTROY';

const actions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,
  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id, questionID) => async (dispatch) => {
    try {
      dispatch({ type: actions.DESTROY_STARTED });

      await QuestionService.destroyAll([id]);

      dispatch({ type: actions.DESTROY_SUCCESS });

      Message.success(
        i18n(
          'entities.questionnaire.question.destroy.success',
        ),
      );

      getHistory().push(`/questionnaire/${questionID}`);
    } catch (error) {
      Errors.handle(error);

      dispatch({ type: actions.DESTROY_ERROR });
    }
  },
  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({ type: actions.DESTROY_ALL_STARTED });

      await QuestionService.destroyAll(ids);

      dispatch({ type: actions.DESTROY_ALL_SUCCESS });

      if (listActions) {
        dispatch(listActions.doChangeSelected([]));
      }

      Message.success(
        i18n(
          'entities.questionnaire.question.destroyAll.success',
        ),
      );

      getHistory().push('/questionnaire');
    } catch (error) {
      Errors.handle(error);

      dispatch({ type: actions.DESTROY_ALL_ERROR });
    }
  },
};

export default actions;

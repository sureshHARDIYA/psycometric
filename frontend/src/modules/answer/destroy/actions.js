import { i18n } from 'i18n';
import Message from 'view/shared/message';
import { getHistory } from 'modules/store';
import Errors from 'modules/shared/error/errors';
import AnswerService from 'modules/answer/service';

const prefix = 'QUESTION_DESTROY';

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

      await AnswerService.destroyAll([id]);

      dispatch({ type: actions.DESTROY_SUCCESS });

      Message.success(
        i18n(
          'entities.questionnaire.answer.destroy.success',
        ),
      );
    } catch (error) {
      Errors.handle(error);

      dispatch({ type: actions.DESTROY_ERROR });
    }
  },
  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({ type: actions.DESTROY_ALL_STARTED });

      await AnswerService.destroyAll(ids);

      dispatch({ type: actions.DESTROY_ALL_SUCCESS });

      Message.success(
        i18n(
          'entities.questionnaire.answer.destroyAll.success',
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

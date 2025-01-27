import { i18n } from 'i18n';
import Service from 'modules/answer/service';
import Errors from 'modules/shared/error/errors';
import Message from 'view/shared/message';

const prefix = 'QUESTION_FORM';

const actions = {
  RESET: `${prefix}_RESET`,

  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doNew: () => {
    return {
      type: actions.RESET,
    };
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: actions.CREATE_STARTED,
      });

      await Service.create(values);

      dispatch({
        type: actions.CREATE_SUCCESS,
      });

      Message.success(
        i18n(
          'entities.questionnaire.answer.create.success',
        ),
      );
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (
    dispatch,
  ) => {
    try {
      dispatch({
        type: actions.UPDATE_STARTED,
      });

      await Service.update(id, values);

      dispatch({
        type: actions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n(
          'entities.questionnaire.answer.update.success',
        ),
      );
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.UPDATE_ERROR,
      });
    }
  },
};

export default actions;

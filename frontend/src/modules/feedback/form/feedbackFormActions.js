import FeedbackService from 'modules/feedback/feedbackService';
import Errors from 'modules/shared/error/errors';
import Message from 'view/shared/message';
import { i18n } from 'i18n';

const prefix = 'FEEDBACK_FORM';

const actions = {
  RESET: `${prefix}_RESET`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: actions.CREATE_STARTED,
      });

      await FeedbackService.create(
        values,
      );

      dispatch({
        type: actions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.feedback.create.title'),
        i18n('entities.feedback.create.description'),
      );
      return Promise.resolve(true);
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.CREATE_ERROR,
      });

      return Promise.reject(error.message);
    }
  },
};

export default actions;

import actions from 'modules/feedback/form/feedbackFormActions';

const initialData = {
  findLoading: false,
  saveLoading: false,
  record: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.RESET) {
    return {
      ...initialData,
    };
  }


  if (type === actions.CREATE_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.CREATE_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.CREATE_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  return state;
};

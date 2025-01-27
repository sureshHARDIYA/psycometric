import actions from 'modules/auth/authActions';

const initialData = {
  currentUser: null,
  loadingInit: true,
  loadingEmailConfirmation: false,
  loadingPasswordResetEmail: false,
  loadingVerifyEmail: false,
  loadingPasswordReset: false,
  loadingUpdateProfile: false,
  loading: false,
  errorMessage: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.ERROR_MESSAGE_CLEARED) {
    return {
      ...state,
      errorMessage: null,
    };
  }

  if (type === actions.CURRENT_USER_REFRESH_SUCCESS) {
    return {
      ...state,
      currentUser: payload.currentUser || null,
    };
  }

  if (type === actions.AUTH_START) {
    return {
      ...state,
      errorMessage: null,
      loading: true,
    };
  }

  if (type === actions.AUTH_SUCCESS) {
    return {
      ...state,
      currentUser: payload.currentUser || null,
      errorMessage: null,
      loading: false,
    };
  }

  if (type === actions.AUTH_ERROR) {
    return {
      ...state,
      currentUser: null,
      errorMessage: payload || null,
      loading: false,
    };
  }

  if (type === actions.EMAIL_CONFIRMATION_START) {
    return {
      ...state,
      loadingEmailConfirmation: true,
    };
  }

  if (type === actions.EMAIL_CONFIRMATION_SUCCESS) {
    return {
      ...state,
      loadingEmailConfirmation: false,
    };
  }

  if (type === actions.EMAIL_CONFIRMATION_ERROR) {
    return {
      ...state,
      loadingEmailConfirmation: false,
    };
  }

  if (type === actions.PASSWORD_RESET_EMAIL_START) {
    return {
      ...state,
      loadingPasswordResetEmail: true,
    };
  }

  if (type === actions.PASSWORD_RESET_EMAIL_SUCCESS) {
    return {
      ...state,
      loadingPasswordResetEmail: false,
    };
  }

  if (type === actions.PASSWORD_RESET_EMAIL_ERROR) {
    return {
      ...state,
      loadingPasswordResetEmail: false,
    };
  }

  if (type === actions.UPDATE_PROFILE_START) {
    return {
      ...state,
      loadingUpdateProfile: true,
    };
  }

  if (type === actions.UPDATE_PROFILE_SUCCESS) {
    return {
      ...state,
      loadingUpdateProfile: false,
    };
  }

  if (type === actions.UPDATE_PROFILE_ERROR) {
    return {
      ...state,
      loadingUpdateProfile: false,
    };
  }

  if (type === actions.AUTH_INIT_SUCCESS) {
    return {
      ...state,
      currentUser: payload.currentUser || null,
      loadingInit: false,
    };
  }

  if (type === actions.AUTH_INIT_ERROR) {
    return {
      ...state,
      currentUser: null,
      loadingInit: false,
    };
  }

  if (type === actions.AUTH_CHANGPASSWORD_START) {
    return {
      ...state,
      errorMessage: null,
      loadingChangePassword: true,
    };
  }

  if (type === actions.AUTH_CHANGPASSWORD_SUCCESS) {
    return {
      ...state,
      errorMessage: null,
      loadingChangePassword: false,
    };
  }

  if (type === actions.AUTH_CHANGPASSWORD_ERROR) {
    return {
      ...state,
      errorMessage: payload || null,
      loadingChangePassword: false,
    };
  }

  return state;
};

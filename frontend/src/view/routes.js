import Permissions from 'security/permissions';
import { i18n } from 'i18n';
const permissions = Permissions.values;

const privateRoutes = [
  {
    path: '/',
    icon: 'home',
    label: i18n('home.menu'),
    menu: {
      exact: true,
    },
    loader: () => import('view/home/HomePage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/questionnaire',
    loader: () =>
      import(
        'view/questionnaire/list/QuestionnaireListPage'
      ),
    permissionRequired: permissions.questionnaireCreate,
    exact: true,
    icon: 'form',
    label: i18n('entities.questionnaire.menu'),
    menu: true,
  },
  {
    path: '/reminder',
    loader: () =>
      import('view/reminder/list/ListPage'),
    permissionRequired: permissions.reminderCreate,
    exact: true,
    icon: 'folder-add',
    label: i18n('entities.reminder.menu'),
    menu: true,
  },
  {
    path: '/emotion',
    loader: () =>
      import('view/emotion/list/EmotionPage'),
    permissionRequired: permissions.reminderCreate,
    exact: true,
    icon: 'folder-add',
    label: i18n('entities.emotion.menu'),
    menu: true,
  },
  {
    path: '/feedback',
    loader: () =>
      import('view/feedback/list/FeedbackListPage'),
    permissionRequired: permissions.feedbackRead,
    exact: true,
    icon: 'transaction',
    label: i18n('entities.feedback.menu'),
    menu: true,
  },
  {
    path: '/records',
    loader: () =>
      import('view/quizRecords/list/QuizRecordListPage'),
    permissionRequired: permissions.quizRecordRead,
    exact: true,
    icon: 'form',
    label: i18n('entities.records.menu'),
    menu: true,
  },
  {
    path: '/profile',
    loader: () => import('view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
    menu: false,
  },

  {
    path: '/iam',
    loader: () => import('view/iam/list/IamPage'),
    permissionRequired: permissions.iamRead,
    exact: true,
    icon: 'user-add',
    label: i18n('iam.menu'),
    menu: true,
  },
  {
    path: '/iam/new',
    loader: () => import('view/iam/new/IamNewPage'),
    menu: false,
    permissionRequired: permissions.iamCreate,
    exact: true,
  },
  {
    path: '/iam/importer',
    loader: () =>
      import('view/iam/importer/IamImporterPage'),
    menu: false,
    permissionRequired: permissions.iamImport,
    exact: true,
  },
  {
    path: '/iam/:id/edit',
    loader: () => import('view/iam/edit/IamEditPage'),
    menu: false,
    permissionRequired: permissions.iamEdit,
    exact: true,
  },
  {
    path: '/iam/:id',
    loader: () => import('view/iam/view/IamViewPage'),
    menu: false,
    permissionRequired: permissions.iamRead,
    exact: true,
  },

  {
    path: '/audit-logs',
    icon: 'file-search',
    label: i18n('auditLog.menu'),
    loader: () => import('view/auditLog/AuditLogPage'),
    menu: true,
    permissionRequired: permissions.owner,
  },

  {
    path: '/settings',
    icon: 'setting',
    label: i18n('settings.menu'),
    loader: () => import('view/settings/SettingsFormPage'),
    permissionRequired: permissions.settingsEdit,
    menu: true,
  },

  {
    path: '/questionnaire/new',
    loader: () =>
      import(
        'view/questionnaire/form/QuestionnaireFormPage'
      ),
    menu: false,
    permissionRequired: permissions.questionnaireCreate,
    exact: true,
  },
  {
    path: '/reminder/new',
    loader: () =>
      import('view/reminder/form/FormPage'),
    menu: false,
    permissionRequired: permissions.reminderCreate,
    exact: true,
  },
  {
    path: '/questionnaire/importer',
    loader: () =>
      import(
        'view/questionnaire/importer/QuestionnaireImporterPage'
      ),
    menu: false,
    permissionRequired: permissions.questionnaireCreate,
    exact: true,
  },
  {
    path: '/questionnaire/:id/edit',
    loader: () =>
      import(
        'view/questionnaire/form/QuestionnaireFormPage'
      ),
    menu: false,
    permissionRequired: permissions.questionnaireEdit,
    exact: true,
  },
  {
    path: '/reminder/:id/edit',
    loader: () =>
      import('view/reminder/form/FormPage'),
    menu: false,
    permissionRequired: permissions.reminderEdit,
    exact: true,
  },
  {
    path: '/questionnaire/:id',
    loader: () =>
      import(
        'view/questionnaire/view/QuestionnaireViewPage'
      ),
    menu: false,
    permissionRequired: permissions.questionnaireRead,
    exact: true,
  },
  {
    path: '/reminder/:id',
    loader: () =>
      import('view/reminder/view/ViewPage'),
    menu: false,
    permissionRequired: permissions.reminderRead,
    exact: true,
  },
  {
    path: '/questionnaire/:id/answer',
    loader: () =>
      import('view/questionnaire/form/AnswerAddFormPage'),
    menu: false,
    permissionRequired: permissions.questionnaireEdit,
    exact: true,
  },
  {
    path: '/questionnaire/:id/question',
    loader: () =>
      import('view/questionnaire/form/QuestionAddFormPage'),
    menu: false,
    permissionRequired: permissions.questionnaireEdit,
    exact: true,
  },
  {
    path: '/questionnaire/:id/question/:id/edit',
    loader: () =>
      import('view/questionnaire/form/QuestionAddFormPage'),
    menu: false,
    permissionRequired: permissions.questionnaireEdit,
    exact: true,
  },
];

const publicRoutes = [
  {
    path: '/auth/signin',
    loader: () => import('view/auth/SigninPage'),
  },
  {
    path: '/auth/signup',
    loader: () => import('view/auth/SignupPage'),
  },
  {
    path: '/auth/forgot-password',
    loader: () => import('view/auth/ForgotPasswordPage'),
  },
  {
    path: '/contact-us',
    loader: () => import('view/feedback/form/FeedbackFromPage'),
  },
];

const emptyPermissionsRoutes = [
  {
    path: '/auth/empty-permissions',
    loader: () => import('view/auth/EmptyPermissionsPage'),
  },
];

const emailUnverifiedRoutes = [
  {
    path: '/auth/email-unverified',
    loader: () => import('view/auth/EmailUnverifiedPage'),
  },
];

const simpleRoutes = [
  {
    path: '/auth/password-reset',
    loader: () => import('view/auth/PasswordResetPage'),
  },
  {
    path: '/auth/verify-email',
    loader: () => import('view/auth/VerifyEmailPage'),
  },
  {
    path: '/403',
    loader: () => import('view/shared/errors/Error403Page'),
  },
  {
    path: '/500',
    loader: () => import('view/shared/errors/Error500Page'),
  },
  {
    path: '**',
    loader: () => import('view/shared/errors/Error404Page'),
  },
];

export default {
  privateRoutes,
  publicRoutes,
  emptyPermissionsRoutes,
  emailUnverifiedRoutes,
  simpleRoutes,
};

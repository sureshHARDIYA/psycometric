const en = {
  common: {
    or: 'or',
    cancel: 'Cancel',
    reset: 'Reset',
    save: 'Save',
    search: 'Search',
    edit: 'Edit',
    remove: 'Remove',
    new: 'New',
    send: 'Send',
    export: 'Export to Excel',
    noDataToExport: 'No data to export',
    import: 'Import',
    discard: 'Discard',
    yes: 'Yes',
    no: 'No',
    pause: 'Pause',
    areYouSure: 'Are you sure?',
    view: 'View',
    destroy: 'Delete',
    mustSelectARow: 'Must select a row',
  },

  app: {
    title: 'Tech Quiz',
  },

  entities: {
    questionnaire: {
      name: 'Questionnaire',
      label: 'Questionnaire',
      menu: 'Questionnaire',
      exporterFileName: 'questionnaire_export',
      list: {
        menu: 'Questionnaire',
        title: 'Questionnaire',
      },
      create: {
        success: 'Questionnaire saved successfully',
      },
      update: {
        success: 'Questionnaire saved successfully',
      },
      destroy: {
        success: 'Questionnaire deleted successfully',
      },
      destroyAll: {
        success: 'Questionnaire(s) deleted successfully',
      },
      edit: {
        title: 'Edit Questionnaire',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        level: 'Level',
        type: 'Type',
        description: 'Description',
        question: 'Question',
        status: 'Status',
        frequency: 'Frequency',
        availableFromRange: 'AvailableFrom',
        availableFrom: 'AvailableFrom',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
        category: 'Select your category',
        createdBy: 'Created by',
        views: 'Views',
      },
      enumerators: {
        status: {
          ACTIVE: 'ACTIVE',
          INACTIVE: 'INACTIVE',
          DRAFT: 'DRAFT',
        },
        frequency: {
          EVERYDAY: 'EVERYDAY',
          EVERYWEEK: 'EVERYWEEK',
          TWICEAWEEK: 'TWICEAWEEK',
          EVERY15DAYS: 'EVERY15DAYS',
          EVERYMONTH: 'EVERYMONTH',
        },
        levels: {
          JUNIOR: 'JUNIOR',
          BEGINNER: 'BEGINNER',
          INTERMEDIATE: 'INTERMEDIATE',
          SENIOR: 'SENIOR',
          EXPERT: 'EXPERT',
        },
        types: {
          QUIZ: 'QUIZ',
          PSYCOMETRIC: 'PSYCOMETRIC',
        },
      },
      new: {
        title: 'New Questionnaire',
      },
      importer: {
        title: 'Import Cases',
        fileName: 'cased_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
      },
      view: {
        title: 'View Questionnaire',
      },
      answer: {
        edit: {
          title: 'Edit Answer',
        },
        new: {
          title: 'Add New Answer',
        },
        fields: {
          id: 'ID',
          title: 'Answer Title',
          type: 'Answer Type',
        },
        enumerators: {
          type: {
            CODE: 'CODE',
            PICTURE: 'PICTURE',
            TEXT: 'TEXT',
          },
        },
        create: {
          success: 'Answer saved successfully',
        },
        update: {
          success: 'Answer saved successfully',
        },
        destroy: {
          success: 'Answer deleted successfully',
        },
        destroyAll: {
          success: 'Answer(s) deleted successfully',
        },
      },
      question: {
        name: 'question',
        label: 'Question',
        edit: {
          title: 'Edit Question',
        },
        new: {
          title: 'Add New Question',
        },
        create: {
          success: 'Question saved successfully',
        },
        update: {
          success: 'Question saved successfully',
        },
        destroy: {
          success: 'Question deleted successfully',
        },
        destroyAll: {
          success: 'Question(s) deleted successfully',
        },
        fields: {
          id: 'ID',
          title: 'Question Content',
        },
      },
    },
    category: {
      name: 'Category',
      label: 'Category',
      menu: 'Category',
      exporterFileName: 'category_export',
      list: {
        menu: 'Category',
        title: 'Category',
      },
      create: {
        success: 'Category saved successfully',
      },
      update: {
        success: 'Category saved successfully',
      },
      destroy: {
        success: 'Category deleted successfully',
      },
      destroyAll: {
        success: 'Category(s) deleted successfully',
      },
      edit: {
        title: 'Edit Category',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        level: 'Level',
        description: 'Description',
        featuredImage: 'Featured image',
        availableFrom: 'AvailableFrom',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      new: {
        title: 'New Category',
      },
      importer: {
        title: 'Import Category',
        fileName: 'category_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
      },
      view: {
        title: 'View Category',
      },
    },
    feedback: {
      name: 'Feedback',
      label: 'Feedback',
      menu: 'Feedback',
      list: {
        menu: 'Feedback',
        title: 'Feedback',
      },
      create: {
        submit: 'Submit',
        title: 'Feedback sent',
        description:
          'Thanks for the feedback on app experience to development team. We sincerely appreciate your insight because it helps us build a app better',
      },
      destroy: {
        success: 'Feedback deleted successfully',
      },
      destroyAll: {
        success: 'Feedback(s) deleted successfully',
      },
      fields: {
        id: 'Id',
        email: 'Email',
        message: 'Message',
        createdAt: 'Created at',
        createdAtRange: 'Created at',
      },
      view: {
        title: 'View Feedback',
      },
    },
    records: {
      name: 'records',
      label: 'Quiz Record',
      menu: 'Records',
      single: 'Module',
      exporterFileName: 'module_export',
      list: {
        menu: 'Modules',
        title: 'Modules',
      },
      create: {
        success: 'Module saved successfully',
      },
      update: {
        success: 'Module saved successfully',
      },
      destroy: {
        success: 'Module deleted successfully',
      },
      destroyAll: {
        success: 'Module(s) deleted successfully',
      },
      edit: {
        title: 'Edit Module',
      },
      fields: {
        id: 'Id',
        owner: 'Owner',
        name: 'Name',
        next: 'Next task',
        description: 'Description',
        status: 'Status',
        tasks: 'Tasks',
        featuredImage: 'FeaturedImage',
        prerequisite: 'Prerequisite',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {
        status: {
          ACTIVE: 'ACTIVE',
          INACTIVE: 'INACTIVE',
          DRAFT: 'DRAFT',
        },
      },
      new: {
        title: 'New Module',
      },
      view: {
        title: 'View Module',
      },
      importer: {
        title: 'Import Modules',
        fileName: 'module_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    task: {
      name: 'task',
      label: 'Tasks',
      menu: 'Tasks',
      single: 'Task',
      exporterFileName: 'task_export',
      list: {
        menu: 'Tasks',
        title: 'Tasks',
      },
      create: {
        success: 'Task saved successfully',
      },
      update: {
        success: 'Task saved successfully',
      },
      destroy: {
        success: 'Task deleted successfully',
      },
      destroyAll: {
        success: 'Task(s) deleted successfully',
      },
      edit: {
        title: 'Edit Task',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        status: 'Status',
        tags: 'Tags',
        pointsRange: 'Points',
        points: 'Points',
        completionRequired: 'CompletionRequired',
        complexityLevelRange: 'ComplexityLevel',
        complexityLevel: 'ComplexityLevel',
        type: 'Type',
        owner: 'Owner',
        elements: 'Elements',
        next: 'Next task',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {
        status: {
          ACTIVE: 'ACTIVE',
          INACTIVE: 'INACTIVE',
          DRAFT: 'DRAFT',
        },
        type: {
          AUDIO: 'AUDIO',
          VIDEO: 'VIDEO',
          TEXT: 'TEXT',
          ASSESSMENT: 'ASSESSMENT',
          FEEDBACK: 'FEEDBACK',
        },
      },
      new: {
        title: 'New Task',
      },
      view: {
        title: 'View Task',
      },
      importer: {
        title: 'Import Tasks',
        fileName: 'task_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    record: {
      name: 'record',
      label: 'Records',
      menu: 'Records',
      exporterFileName: 'record_export',
      list: {
        menu: 'Records',
        title: 'Records',
      },
      create: {
        success: 'Record saved successfully',
      },
      update: {
        success: 'Record saved successfully',
      },
      destroy: {
        success: 'Record deleted successfully',
      },
      destroyAll: {
        success: 'Record(s) deleted successfully',
      },
      edit: {
        title: 'Edit record',
      },
      fields: {
        id: 'Id',
        description: 'Description',
        host: 'Cased',
        state: 'State',
        owner: 'Patient',
        status: 'Status',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
        roadmap: {
          host: 'Module',
          children: 'Task',
          elements: 'Elements',
          'completion?': 'Completion?',
          completionRequired: 'Completion Required',
        },
      },
      enumerators: {
        state: {
          LOCKED: 'LOCKED',
          ACTIVE: 'ACTIVE',
          PROGRESS: 'PROGRESS',
          COMPLETE: 'COMPLETE',
        },
        status: {
          ACTIVE: 'ACTIVE',
          INACTIVE: 'INACTIVE',
          DRAFT: 'DRAFT',
        },
      },
      new: {
        title: 'New record',
      },
      view: {
        title: 'View record',
      },
      importer: {
        title: 'Import records',
        fileName: 'record_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
      },
      module: {
        title: 'View Module',
      },
      task: {
        title: 'View Task',
      },
    },
  },

  auth: {
    profile: {
      title: 'Edit Profile',
      success: 'Profile updated successfully',
    },
    createAnAccount: 'Create an account',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password',
    signin: 'Sign in',
    signup: 'Sign up',
    signout: 'Sign out',
    alreadyHaveAnAccount:
      'Already have an account? Sign in.',
    signinWithAnotherAccount:
      'Sign in with another account',
    emailUnverified: {
      message: `Please confirm your email at <strong>{0}</strong> to continue.`,
      submit: `Resend email verification`,
    },
    emptyPermissions: {
      message: `You have no permissions yet. Wait for the admin to grant you privileges.`,
    },
    passwordResetEmail: {
      message: 'Send password reset email',
      error: `Email not recognized`,
    },
    passwordReset: {
      message: 'Reset password',
    },
    emailAddressVerificationEmail: {
      error: `Email not recognized`,
    },
    verificationEmailSuccess: `Verification email sent successfully`,
    passwordResetEmailSuccess: `Password reset email sent successfully`,
    passwordResetSuccess: `Password changed successfully`,
    verifyEmail: {
      success: 'Email successfully verified',
      message:
        'Just a moment, your email is being verified...',
    },
    changepassword: {
      add: 'Update Password',
      hide: 'Hide Password',
    },
  },

  roles: {
    owner: {
      label: 'Owner',
      description: 'Full access to all resources',
    },
    editor: {
      label: 'Editor',
      description: 'Edit access to all resources',
    },
    trainer: {
      label: 'Trainer',
      description: 'Edits access to all resources',
    },
    learner: {
      label: 'Learner',
      description: 'Access learning resources',
    },
    member: {
      label: 'Member',
      description: `Restricted access`,
    },
    public: {
      label: 'Public',
      description: 'Only frontend access.',
    },
  },

  iam: {
    title: 'Identity and Access Management',
    menu: 'IAM',
    disable: 'Disable',
    disabled: 'Disabled',
    enabled: 'Enabled',
    enable: 'Enable',
    doEnableSuccess: 'User enabled successfully',
    doDisableSuccess: 'User disabled successfully',
    doDisableAllSuccess: 'User(s) disabled successfully',
    doEnableAllSuccess: 'User(s) enabled successfully',
    doAddSuccess: 'User(s) saved successfully',
    doUpdateSuccess: 'User saved successfully',
    viewBy: 'View By',
    users: {
      name: 'users',
      label: 'Users',
      exporterFileName: 'users_export',
      doRemoveAllSelectedSuccess:
        'Permissions removed successfully',
    },
    roles: {
      label: 'Roles',
      doRemoveAllSelectedSuccess:
        'Permissions removed successfully',
    },
    edit: {
      title: 'Edit User',
    },
    new: {
      title: 'New User(s)',
      titleModal: 'New User',
      emailsHint:
        'Separate multiple email addresses using the comma character.',
    },
    view: {
      playedQuizes: 'Quizzes taken by this author',
      favouritedQuestionnaire: 'Favourited',
      title: 'View User',
      activity: 'Activity',
    },
    importer: {
      title: 'Import Users',
      fileName: 'users_import_template',
      hint:
        'Files/Images columns must be the URLs of the files separated by space. Relationships must be the ID of the referenced records separated by space. Roles must be the role ids separated by space.',
    },
    errors: {
      userAlreadyExists:
        'User with this email already exists',
      userNotFound: 'User not found',
      disablingHimself: `You can't disable yourself`,
      revokingOwnPermission: `You can't revoke your own owner permission`,
    },
  },

  user: {
    fields: {
      id: 'Id',
      authenticationUid: 'Authentication Uid',
      avatars: 'Avatar',
      email: 'Email',
      emails: 'Email(s)',
      fullName: 'Name',
      firstName: 'First Name',
      lastName: 'Last Name',
      status: 'Status',
      disabled: 'Disabled',
      phoneNumber: 'Phone Number',
      role: 'Role',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
      roleUser: 'Role/User',
      roles: 'Roles',
      createdAtRange: 'Created at',
      password: 'Password',
      newPassword: 'New Password',
      patient: 'Patient',
      rememberMe: 'Remember me',
      postStatus: 'Current Status',
      newQuestionnaireAlert: 'Notify on new questionnaire',
      remindersAlert: 'Remind me to take quiz',
      intrestedCategories: 'Interest category',
    },
    enabled: 'Enabled',
    disabled: 'Disabled',
    validations: {
      // eslint-disable-next-line
      email: 'Email ${value} is invalid',
    },
  },

  auditLog: {
    menu: 'Audit Logs',
    title: 'Audit Logs',
    exporterFileName: 'audit_log_export',
    entityNamesHint:
      'Separate multiple entities using the comma character.',
    fields: {
      id: 'Id',
      timestampRange: 'Period',
      entityName: 'Entity',
      entityNames: 'Entities',
      entityId: 'Entity ID',
      action: 'Action',
      values: 'Values',
      timestamp: 'Date',
      createdByEmail: 'User Email',
    },
  },
  settings: {
    title: 'Settings',
    menu: 'Settings',
    save: {
      success:
        'Settings saved successfully. The page will reload in {0} seconds for changes to take effect.',
    },
    fields: {
      theme: 'Theme',
    },
    colors: {
      default: 'Default',
      cyan: 'Cyan',
      'geek-blue': 'Geek Blue',
      gold: 'Gold',
      lime: 'Lime',
      magenta: 'Magenta',
      orange: 'Orange',
      'polar-green': 'Polar Green',
      purple: 'Purple',
      red: 'Red',
      volcano: 'Volcano',
      yellow: 'Yellow',
    },
  },
  home: {
    menu: 'Home',
    message: `This page uses fake data for demonstration purposes only. You can edit it at frontend/view/home/HomePage.js.`,
    charts: {
      day: 'Day',
      red: 'Red',
      green: 'Green',
      yellow: 'Yellow',
      grey: 'Grey',
      blue: 'Blue',
      orange: 'Orange',
      months: {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
      },
      eating: 'Eating',
      drinking: 'Drinking',
      sleeping: 'Sleeping',
      designing: 'Designing',
      coding: 'Coding',
      cycling: 'Cycling',
      running: 'Running',
      customer: 'Customer',
    },
  },
  errors: {
    backToHome: 'Back to home',
    403: `Sorry, you don't have access to this page`,
    404: 'Sorry, the page you visited does not exist',
    500: 'Sorry, the server is reporting an error',
    forbidden: {
      message: 'Forbidden',
    },
    validation: {
      message: 'An error occurred',
    },
    defaultErrorMessage: 'Ops, an error occurred',
  },
  // See https://github.com/jquense/yup#using-a-custom-locale-dictionary
  /* eslint-disable */
  validation: {
    mixed: {
      default: '${path} is invalid',
      required: '${path} is required',
      oneOf:
        '${path} must be one of the following values: ${values}',
      notOneOf:
        '${path} must not be one of the following values: ${values}',
      notType: ({ path, type, value, originalValue }) => {
        return `${path} must be a ${type}`;
      },
    },
    string: {
      length:
        '${path} must be exactly ${length} characters',
      min: '${path} must be at least ${min} characters',
      max: '${path} must be at most ${max} characters',
      matches:
        '${path} must match the following: "${regex}"',
      email: '${path} must be a valid email',
      url: '${path} must be a valid URL',
      trim: '${path} must be a trimmed string',
      lowercase: '${path} must be a lowercase string',
      uppercase: '${path} must be a upper case string',
      selected: '${path} must be selected',
    },
    number: {
      min:
        '${path} must be greater than or equal to ${min}',
      max: '${path} must be less than or equal to ${max}',
      lessThan: '${path} must be less than ${less}',
      moreThan: '${path} must be greater than ${more}',
      notEqual: '${path} must be not equal to ${notEqual}',
      positive: '${path} must be a positive number',
      negative: '${path} must be a negative number',
      integer: '${path} must be an integer',
    },
    date: {
      min: '${path} field must be later than ${min}',
      max: '${path} field must be at earlier than ${max}',
    },
    boolean: {},
    object: {
      noUnknown:
        '${path} field cannot have keys not specified in the object shape',
    },
    array: {
      min: '${path} field must have at least ${min} items',
      max:
        '${path} field must have less than or equal to ${max} items',
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: 'Upload',
    image: 'You must upload an image',
    size: 'File is too big. Max allowed size is {0}',
    formats: `Invalid format. Must be '{0}'.`,
  },
  importer: {
    line: 'Line',
    status: 'Status',
    pending: 'Pending',
    imported: 'Imported',
    error: 'Error',
    total: `{0} imported, {1} pending and {2} with error`,
    importedMessage: `Processed {0} of {1}.`,
    noNavigateAwayMessage:
      'Do not navigate away from this page or import will be stopped.',
    completed: {
      success:
        'Import completed. All rows were successfully imported.',
      someErrors:
        'Processing completed, but some rows were unable to be imported.',
      allErrors: 'Import failed. There are no valid rows.',
    },
    form: {
      downloadTemplate: 'Download the template',
      hint:
        'Click or drag the file to this area to continue',
    },
    list: {
      discardConfirm:
        'Are you sure? Non-imported data will be lost.',
    },
    errors: {
      invalidFileEmpty: 'The file is empty',
      invalidFileExcel:
        'Only excel (.xlsx) files are allowed',
      invalidFileUpload:
        'Invalid file. Make sure you are using the last version of the template.',
      importHashRequired: 'Import hash is required',
      importHashExistent: 'Data has already been imported',
    },
  },

  autocomplete: {
    loading: 'Loading...',
  },

  imagesViewer: {
    noImage: 'No image',
  },
};

export default en;

const ptBR = {
  common: {
    or: 'Eller',
    cancel: 'Avbryt',
    reset: 'Nullstille',
    save: 'Lagre',
    search: 'Søk',
    edit: 'Redigere',
    remove: 'Ta vekk',
    new: 'Ny',
    export: 'Eksport Excel',
    noDataToExport: 'Não há dados para exportar',
    import: 'Importar',
    discard: 'Descartar',
    yes: 'Ja',
    no: 'Nei',
    pause: 'pause',
    areYouSure: 'Er du sikker?',
    view: 'Utsikt',
    destroy: 'Slett',
    mustSelectARow: 'Selecine uma linha',
  },

  app: {
    title: 'Psychometric',
  },

  entities: {
    questionnaire: {
      name: 'Spørreskjema',
      label: 'Spørreskjema',
      menu: 'Spørreskjema',
      exporterFileName: 'questionnaire_export',
      list: {
        menu: 'Spørreskjema',
        title: 'Spørreskjema',
      },
      create: {
        success: 'Spørreskjema saved successfully',
      },
      update: {
        success: 'Spørreskjema saved successfully',
      },
      destroy: {
        success: 'Spørreskjema deleted successfully',
      },
      destroyAll: {
        success: 'Spørreskjema(s) deleted successfully',
      },
      edit: {
        title: 'Edit Spørreskjema',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        level: 'Level',
        type: 'Type',
        description: 'Description',
        question: 'Question',
        status: 'Status',
        test: 'Send test schedule?',
        frequency: 'Frequency',
        availableFromRange: 'AvailableFrom',
        availableFrom: 'AvailableFrom',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
        category: 'Select your category',
        createdBy: 'Created by',
        views: 'Views',
        audience: 'Audience',
        schedule: 'Schedule',
        audienceList: 'Audience List',
      },
      enumerators: {
        status: {
          ACTIVE: 'ACTIVE',
          INACTIVE: 'INACTIVE',
          DRAFT: 'DRAFT',
        },
        frequency: {
          WEEKLY: 'Weekly',
          BIWEEKLY: 'Biweekly',
          MONTHLY: 'Monthly',
        },
        test: {
          yes: 'Yes',
          no: 'No',
        },
        audience: {
          ALL: 'All users',
          USER: 'User on list',
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
        title: 'New Spørreskjema',
      },
      importer: {
        title: 'Import Cases',
        fileName: 'cased_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
      },
      view: {
        title: 'View Spørreskjema',
      },
      rule: {
        edit: {
          title: 'Edit Rule',
        },
        new: {
          title: 'Add Rule',
        },
        fields: {
          id: 'ID',
          min: 'Min Score',
          max: 'Max Score',
          message: 'Message',
        },
        create: {
          success: 'Rule saved successfully',
        },
        update: {
          success: 'Rule saved successfully',
        },
        destroy: {
          success: 'Rule deleted successfully',
        },
        destroyAll: {
          success: 'Rule(s) deleted successfully',
        },
      },
      answer: {
        edit: {
          title: 'Edit Answer',
        },
        new: {
          title: 'Add Answer',
        },
        fields: {
          id: 'ID',
          title: 'Title',
          type: 'Type',
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
          title: 'Add Question',
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
          title: 'Content',
        },
      },
    },
    quizRecords: {
      list: {
        menu: 'Submissions',
        title: 'Submissions',
      },
    },
    reminder: {
      name: 'Reminder',
      label: 'Reminder',
      menu: 'Reminder',
      exporterFileName: 'reminder_export',
      list: {
        menu: 'Reminder',
        title: 'Reminder',
      },
      create: {
        success: 'Reminder saved successfully',
      },
      update: {
        success: 'Reminder saved successfully',
      },
      destroy: {
        success: 'Reminder deleted successfully',
      },
      destroyAll: {
        success: 'Reminder(s) deleted successfully',
      },
      edit: {
        title: 'Edit Reminder',
      },
      fields: {
        id: 'Id',
        title: 'Title',
        message: 'Message',
        schedule: 'Schedule',
        frequency: 'Frequency',
        audience: 'Audience',
        audienceList: 'Audience List',
        questionnaire: 'Spørreskjema',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        test: 'Send test schedule?',
      },
      new: {
        title: 'New Reminder',
      },
      importer: {
        title: 'Import Reminder',
        fileName: 'reminder_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
      },
      view: {
        title: 'View Reminder',
      },
      enumerators: {
        frequency: {
          WEEKLY: 'Weekly',
          BIWEEKLY: 'Biweekly',
          MONTHLY: 'Monthly',
        },
        audience: {
          ALL: 'All users',
          USER: 'User on list',
        },
        test: {
          yes: 'Yes',
          no: 'No',
        },
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

    patient: {
      name: 'Patient',
      label: 'Patients',
      menu: 'Patients',
      exporterFileName: 'Patient_exportados',
      list: {
        menu: 'Patients',
        title: 'Patients',
      },
      create: {
        success: 'Patient salvo com sucesso',
      },
      update: {
        success: 'Patient salvo com sucesso',
      },
      destroy: {
        success: 'Patient deletado com sucesso',
      },
      destroyAll: {
        success: 'Patient(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Patient',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        birthdateRange: 'Birthdate',
        birthdate: 'Birthdate',
        gender: 'Gender',
        assignCase: 'AssignCase',
        phone: 'Phone',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        gender: {
          male: 'Male',
          female: 'Female',
        },
      },
      new: {
        title: 'Novo Patient',
      },
      view: {
        title: 'Visualizar Patient',
      },
      importer: {
        title: 'Importar Patients',
        fileName: 'patient_template_importacao',
        hint:
          'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },
  },

  auth: {
    profile: {
      title: 'Editar Perfil',
      success: 'Perfil atualizado com sucesso',
    },
    createAnAccount: 'Criar uma conta',
    rememberMe: 'Lembrar-me',
    forgotPassword: 'Esqueci minha senha',
    signin: 'Entrar',
    signup: 'Registrar',
    signout: 'Sair',
    alreadyHaveAnAccount: 'Já possui uma conta? Entre.',
    signinWithAnotherAccount: 'Entrar com outra conta',
    emailUnverified: {
      message: `Por favor, confirme seu email em <strong>{0}</strong> para continuar.`,
      submit: `Reenviar confirmação por email`,
    },
    emptyPermissions: {
      message: `Você ainda não possui permissões. Aguarde o administrador conceder seus privilégios.`,
    },
    passwordResetEmail: {
      message: 'Enviar email de redefinição de senha',
      error: `Email não encontrado`,
    },
    passwordReset: {
      message: 'Alterar senha',
    },
    emailAddressVerificationEmail: {
      error: `Email não encontrado`,
    },
    verificationEmailSuccess: `Verificação de email enviada com sucesso`,
    passwordResetEmailSuccess: `Email de redefinição de senha enviado com sucesso`,
    passwordResetSuccess: `Senha alterada com sucesso`,
    verifyEmail: {
      success: 'Email verificado com sucesso',
      message:
        'Aguarde um momento, seu email está sendo verificado...',
    },
  },

  roles: {
    owner: {
      label: 'Proprietário',
      description: 'Acesso completo a todos os recursos',
    },
    editor: {
      label: 'Editor',
      description: 'Acesso para edição a todos os recursos',
    },
    viewer: {
      label: 'Visualizador',
      description:
        'Acesso de visualização a todos os recursos',
    },
    auditLogViewer: {
      label: 'Visualizador de Registros de Autoria',
      description:
        'Acesso de visualização dos registros de autoria',
    },
    iamSecurityReviewer: {
      label: 'Revisor de segurança',
      description: `Acesso total para gerenciar as funções do usuário`,
    },
    entityEditor: {
      label: 'Editor de Entidades',
      description: 'Acesso de edição a todas as entidades',
    },
    entityViewer: {
      label: 'Visualizador de Entidades',
      description:
        'Acesso de visualização a todas as entidades',
    },
    patientEditor: {
      label: 'Editor de Patients',
      description: 'Acesso de edição aos Patients',
    },
    patientViewer: {
      label: 'Visualizador de Patients',
      description: 'Acesso de visualização aos Patients',
    },
    casedEditor: {
      label: 'Editor de Cases',
      description: 'Acesso de edição aos Cases',
    },
    casedViewer: {
      label: 'Visualizador de Cases',
      description: 'Acesso de visualização aos Cases',
    },
    moduleEditor: {
      label: 'Editor de Modules',
      description: 'Acesso de edição aos Modules',
    },
    moduleViewer: {
      label: 'Visualizador de Modules',
      description: 'Acesso de visualização aos Modules',
    },
    taskEditor: {
      label: 'Editor de Tasks',
      description: 'Acesso de edição aos Tasks',
    },
    taskViewer: {
      label: 'Visualizador de Tasks',
      description: 'Acesso de visualização aos Tasks',
    },
    audioEditor: {
      label: 'Editor de Audio',
      description: 'Acesso de edição aos Audio',
    },
    audioViewer: {
      label: 'Visualizador de Audio',
      description: 'Acesso de visualização aos Audio',
    },
    documentEditor: {
      label: 'Editor de Documents',
      description: 'Acesso de edição aos Documents',
    },
    documentViewer: {
      label: 'Visualizador de Documents',
      description: 'Acesso de visualização aos Documents',
    },
  },

  iam: {
    title: 'Gerenciamento de usuários e permissões',
    menu: 'IAM',
    disable: 'Desabilitar',
    disabled: 'Desabilitado',
    enabled: 'Habilitado',
    enable: 'Habilitar',
    doEnableSuccess: 'Usuário habilitado com sucesso',
    doDisableSuccess: 'Usuário desabilitado com sucesso',
    doDisableAllSuccess:
      'Usuário(s) desabilitado(s) com sucesso',
    doEnableAllSuccess:
      'Usuário(s) habilidatos com sucesso',
    doAddSuccess: 'Usuário(s) salvos com sucesso',
    doUpdateSuccess: 'Usuário salvo com sucesso',
    viewBy: 'Visualizar por',
    users: {
      name: 'users',
      label: 'Usuários',
      exporterFileName: 'usuarios_exportados',
      doRemoveAllSelectedSuccess:
        'Permissões removidas com sucesso',
    },
    roles: {
      label: 'Perfis',
      doRemoveAllSelectedSuccess:
        'Permissões removidas com sucesso',
    },
    edit: {
      title: 'Editar usuário',
    },
    new: {
      title: 'Novo(s) Usuário(s)',
      titleModal: 'Novo Usuário',
      emailsHint:
        'Separe múltiplos endereços de e-mail usando a vírgula.',
    },
    view: {
      title: 'Visualizar Usuário',
      activity: 'Atividades',
    },
    importer: {
      title: 'Importar Usuários',
      fileName: 'usuarios_template_importacao',
      hint:
        'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
    },
    errors: {
      userAlreadyExists: 'Usuário com este email já existe',
      userNotFound: 'Usuário não encontrado',
      disablingHimself: `Você não pode desativar-se`,
      revokingOwnPermission: `Você não pode revogar sua própria permissão de proprietário`,
    },
  },

  user: {
    fields: {
      id: 'Id',
      authenticationUid: 'Id de autenticação',
      avatars: 'Avatar',
      email: 'Email',
      emails: 'Email(s)',
      fullName: 'Nome',
      firstName: 'Nome',
      lastName: 'Sobrenome',
      status: 'Estado',
      disabled: 'Desativado',
      role: 'Perfil',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
      roleUser: 'Perfil/Usuário',
      roles: 'Perfis',
      createdAtRange: 'Criado em',
      password: 'Senha',
      rememberMe: 'Lembrar-me',
    },
    enabled: 'Habilitado',
    disabled: 'Desabilitado',
    validations: {
      // eslint-disable-next-line
      email: 'Email ${value} é inválido',
    },
  },

  auditLog: {
    menu: 'Registros de Auditoria',
    title: 'Registros de Auditoria',
    exporterFileName: 'registros_autoria_exportados',
    entityNamesHint:
      'Separe múltiplas entidades por vírgula',
    fields: {
      id: 'Id',
      timestampRange: 'Período',
      entityName: 'Entidade',
      entityNames: 'Entidades',
      entityId: 'ID da Entidade',
      action: 'Ação',
      values: 'Valores',
      timestamp: 'Data',
      createdByEmail: 'Email do Usuário',
    },
  },
  settings: {
    title: 'Configurações',
    menu: 'Configurações',
    save: {
      success:
        'Configurações salvas com sucesso. A página irá recarregar em {0} para que as alterações tenham efeito.',
    },
    fields: {
      theme: 'Tema',
    },
    colors: {
      default: 'Padrão',
      cyan: 'Ciano',
      'geek-blue': 'Azul escuro',
      gold: 'Ouro',
      lime: 'Limão',
      magenta: 'Magenta',
      orange: 'Laranja',
      'polar-green': 'Verde polar',
      purple: 'Roxo',
      red: 'Vermelho',
      volcano: 'Vúlcão',
      yellow: 'Amarelo',
    },
  },
  home: {
    menu: 'Hjem',
    message: `Esta página usa dados falsos apenas para fins de demonstração. Você pode editá-la em frontend/view/home/HomePage.js.`,
    charts: {
      day: 'Dia',
      red: 'Vermelho',
      green: 'Verde',
      yellow: 'Amarelho',
      grey: 'Cinza',
      blue: 'Azul',
      orange: 'Laranja',
      months: {
        1: 'Janeiro',
        2: 'Fevereiro',
        3: 'Março',
        4: 'Abril',
        5: 'Maio',
        6: 'Junho',
        7: 'Julho',
      },
      eating: 'Comendo',
      drinking: 'Bebendo',
      sleeping: 'Dormindo',
      designing: 'Projetando',
      coding: 'Codificando',
      cycling: 'Pedalando',
      running: 'Correndo',
      customer: 'Cliente',
    },
  },
  errors: {
    backToHome: 'Voltar a página inicial',
    403: `Desculpe, você não tem acesso a esta página`,
    404: 'Desculpe, a página que você visitou não existe',
    500: 'Desculpe, o servidor está relatando um erro',
    forbidden: {
      message: 'Acesso negado',
    },
    validation: {
      message: 'Ocorreu um erro',
    },
    defaultErrorMessage: 'Ops, ocorreu um erro',
  },
  // See https://github.com/jquense/yup#using-a-custom-locale-dictionary
  /* eslint-disable */
  validation: {
    mixed: {
      default: '${path} é inválido',
      required: '${path} é obrigatório',
      oneOf:
        '${path} deve ser um dos seguintes valores: ${values}',
      notOneOf:
        '${path} não deve ser um dos seguintes valores: ${values}',
      notType: ({ path, type, value, originalValue }) => {
        return `${path} deve ser um ${type}`;
      },
    },
    string: {
      length: '${path} deve possuir ${length} caracteres',
      min:
        '${path} deve possuir ao menos ${min} caracteres',
      max:
        '${path} deve possui no máximo ${max} caracteres',
      matches:
        '${path} deve respeitar o padrão: "${regex}"',
      email: '${path} deve ser um email válido',
      url: '${path} deve ser uma URL válida',
      trim:
        '${path} deve ser uma palavra sem espaços em branco',
      lowercase: '${path} deve ser minúsculo',
      uppercase: '${path} deve ser maiúsculo',
      selected: '${path} deve ser selecionado',
    },
    number: {
      min: '${path} deve ser maior ou igual a ${min}',
      max: '${path} deve ser menor ou igual a ${max}',
      lessThan: '${path} deve ser menor que ${less}',
      moreThan: '${path} deve ser maior que ${more}',
      notEqual: '${path} não deve ser igual a ${notEqual}',
      positive: '${path} deve ser um número positivo',
      negative: '${path} deve ser um número negativo',
      integer: '${path} deve ser um inteiro',
    },
    date: {
      min: '${path} deve ser posterior a ${min}',
      max: '${path} deve ser mais cedo do que ${max}',
    },
    boolean: {},
    object: {
      noUnknown:
        '${path} não pode ter atributos não especificados no formato do objeto',
    },
    array: {
      min: '${path} deve possuir ao menos ${min} itens',
      max: '${path} deve possuir no máximo ${max} itens',
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: 'Upload',
    image: 'Você deve fazer upload de uma imagem',
    size:
      'O arquivo é muito grande. O tamanho máximo permitido é {0}',
    formats: `Formato inválido. Deve ser: '{0}'.`,
  },
  importer: {
    line: 'Linha',
    status: 'Estado',
    pending: 'Pendente',
    imported: 'Importado',
    error: 'Erro',
    total: `{0} importado, {1} pendente e {2} com erro`,
    importedMessage: `Processados {0} de {1}.`,
    noNavigateAwayMessage:
      'Não saia desta página ou a importação será interrompida.',
    completed: {
      success:
        'Importação concluída. Todas as linhas foram importadas com sucesso.',
      someErrors:
        'O processamento foi concluído, mas algumas linhas não puderam ser importadas.',
      allErrors:
        'Importação falhou. Não há linhas válidas.',
    },
    form: {
      downloadTemplate: 'Baixe o modelo',
      hint:
        'Clique ou arraste o arquivo para esta área para continuar.',
    },
    list: {
      discardConfirm:
        'Você tem certeza? Dados não importados serão perdidos.',
    },
    errors: {
      invalidFileEmpty: 'O arquivo está vazio',
      invalidFileExcel:
        'Apenas arquivos Excel (.xlsx) são permitidos',
      invalidFileUpload:
        'Arquivo inválido. Verifique se você está usando a última versão do modelo.',
      importHashRequired: 'Hash de importação é necessário',
      importHashExistent: 'Dados já foram importados',
    },
  },

  autocomplete: {
    loading: 'Carregando...',
  },

  imagesViewer: {
    noImage: 'Sem imagem',
  },
};

export default ptBR;

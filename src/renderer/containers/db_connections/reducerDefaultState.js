const defaultState = {
  databases: [],
  databasesLoader: true,

  selectedDatabase: null,

  addForm: {
    loader: false,
    fields: {
      dbType: {
        defaultValue: 'pg',
        validations: [],
        value: 'pg',
        errors: []
      },
      dbName: {
        defaultValue: '',
        validations: [],
        value: '',
        errors: []
      },
      hostname: {
        defaultValue: 'localhost',
        validations: [],
        value: 'localhost',
        errors: []
      },
      port: {
        defaultValue: '5432',
        validations: [],
        value: '5432',
        errors: []
      },
      username: {
        defaultValue: '',
        validations: [],
        value: '',
        errors: []
      },
      password: {
        defaultValue: '',
        validations: [],
        value: '',
        errors: []
      },
      database: {
        defaultValue: '',
        validations: [],
        value: '',
        errors: []
      },
      socket: {
        defaultValue: '',
        validations: [],
        value: '',
        errors: []
      }
    }
  }
}

export default defaultState

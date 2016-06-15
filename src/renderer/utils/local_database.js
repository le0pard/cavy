import Dexie from 'dexie'

const DATABASE_NAME = 'cavy'
const DATABASE_VERSION = 1
const R_MODE = 'r' // read only mode
const RW_MODE = 'rw' // read-write mode

class LocalDatabase {
  constructor() {
    this.db = new Dexie(DATABASE_NAME)
    this.createDbSchema()
    this.connectToDatabase()
  }

  createDbSchema() {
    this.db.version(DATABASE_VERSION).stores({
      databases: '++id,dbType,dbName,uiOrder'
    })
  }

  connectToDatabase() {
    this.db.open()
  }

  addDatabase(fields) {
    return this.db.databases.count().
      then((count) => this.db.databases.add({...fields, uiOrder: count})).
      then((id) => this.db.databases.get(id))
  }
}

export default (new LocalDatabase())

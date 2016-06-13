import Dexie from 'dexie'

const DATABASE_NAME = 'cavy'
const DATABASE_VERSION = 1

class LocalDatabase {
  constructor() {
    this.db = new Dexie(DATABASE_NAME)
    this.createDbSchema()
    this.connectToDatabase()
  }

  createDbSchema() {
    this.db.version(DATABASE_VERSION).stores({
      databases: '++id,db_type,db_name,ui_order'
    })
  }

  connectToDatabase() {
    this.db.open()
    this.db.transaction('rw', this.db.databases, () => {
      /*
      this.db.databases.add({
        db_type: 'pg',
        db_name: 'PostgreSQL',
        ui_order: 1
      })
      */
    })
  }
}

export default LocalDatabase

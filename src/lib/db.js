import PouchDB from 'pouchdb-browser';

const CAVY_DB_NAME = 'cavy';

class DB {
  constructor() {
    this.db = new PouchDB(CAVY_DB_NAME);
  }
}

export default DB;

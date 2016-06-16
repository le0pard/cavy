import pg from 'pg'

export const connectToDB = (database) => {
  pg.connect(`postgres://${database.username}:${database.password}@${database.hostname}/leo`, (err, client, done) => {
    if (err)
      return console.error('error fetching client from pool', err)
  })
}

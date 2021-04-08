//tinydragondice/server/db.js
const path = require('path');
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: dbPath,
    },
    useNullAsDefault: true
})

knex.schema.hasTable('products')
    .then((exists) => {
      if (!exists) {
        // If no "product" table exists, create one
        return knex.schema.createTable('products', (table)  => {
          table.increments('id').primary()
          table.string('name')
          table.integer('price')
          table.integer('qty')
          table.string('shortDesc')
          table.string('longDesc')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Products\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Just for debugging purposes:
// Log all data in "books" table
knex.select('*').from('products')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

// Export the database
module.exports = knex
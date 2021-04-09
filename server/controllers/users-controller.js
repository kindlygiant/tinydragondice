//tinydragondice/server/controllers/users-controller.js

const knex = require('./../db')

// Retrieve all users
exports.getAllUsers = async (req, res) => {
    knex.select('*').from('users')
      .then(userData => {
        res.json(userData)
      })
      .catch(err => {
        res.json({ message: `There was an error retrieving the Users: ${err}` })
      })
  }
  
  // Create new User
  exports.createUser = async (req, res) => {
    knex('users').insert({
        'id': req.body.id,
        'username': req.body.username,
        'password': req.body.password,
        'supportTier': req.body.supportTier,
        'isAdmin': req.body.isAdmin
      })
      .then(() => {
        res.json({ message: `User \'${req.body.username}\' created.` })
      })
      .catch(err => {
        res.json({ message: `There was an error creating ${req.body.username}: ${err}` })
      })
  }

  // Update specific User
  // pid : User Id
  exports.updateUser = async (req, res) => {
    knex('users').update({
        'username': req.body.username,
        'password': req.body.password,
        'supportTier': req.body.supportTier,
        'isAdmin': req.body.isAdmin
    }).where('id', req.params.pid)
    .then(() => {
      res.json({ message: `User pid:\'${req.params.uid}\' updated.` })
    })
    .catch(err => {
      res.json({ message: `There was an error updating uid:\'${req.params.uid}\': ${err}` })
    })
  }

  // Remove specific User
  // pid : User Id
  exports.deleteUser = async (req, res) => {
    knex('users').where('id', req.params.uid).del()
      .then(() => {
        res.json({ message: `User pid:\'${req.params.uid}\' deleted.` })
      })
      .catch(err => {
        res.json({ message: `There was an error deleting uid:\'${req.params.uid}\': ${err}` })
      })
  }
  
  // Remove all Users on the list
  exports.removeAllUsers = async (req, res) => {
    knex.select('*').from('users').truncate()
      .then(() => {
        res.json({ message: 'User list cleared.' })
      })
      .catch(err => {
        res.json({ message: `There was an error resetting user list: ${err}.` })
      })
  }
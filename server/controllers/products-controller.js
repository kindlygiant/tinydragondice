//tinydragondice/server/controllers/products-controller.js

const knex = require('./../db')

// Retrieve all products
exports.getAllProducts = async (req, res) => {
    knex.select('*').from('products')
      .then(userData => {
        res.json(userData)
      })
      .catch(err => {
        res.json({ message: `There was an error retrieving the products: ${err}` })
      })
  }
  
  // Create new product
  exports.createProduct = async (req, res) => {
    knex('products').insert({
        'id': req.body.id,
        'name': req.body.name,
        'price': req.body.price,
        'qty': req.body.qty,
        'shortDesc': req.body.shortDesc,
        'longDesc': req.body.longDesc
      })
      .then(() => {
        res.json({ message: `Product \'${req.body.name}\' created.` })
      })
      .catch(err => {
        res.json({ message: `There was an error creating ${req.body.name}: ${err}` })
      })
  }

  // Update specific product
  // pid : Product Id
  exports.updateProduct = async (req, res) => {
    knex('products').update({
      'name': req.body.name,
      'price': req.body.price,
      'qty': req.body.qty,
      'shortDesc': req.body.shortDesc,
      'longDesc': req.body.longDesc
    }).where('id', req.params.pid)
    .then(() => {
      res.json({ message: `Product pid:\'${req.params.pid}\' updated.` })
    })
    .catch(err => {
      res.json({ message: `There was an error updating pid:\'${req.params.pid}\': ${err}` })
    })
  }

  // Remove specific product
  // pid : Product Id
  exports.deleteProduct = async (req, res) => {
    knex('products').where('id', req.params.pid).del()
      .then(() => {
        res.json({ message: `Product pid:\'${req.params.pid}\' deleted.` })
      })
      .catch(err => {
        res.json({ message: `There was an error deleting pid:\'${req.params.pid}\': ${err}` })
      })
  }
  
  // Remove all products on the list
  exports.removeAllProducts = async (req, res) => {
    knex.select('*').from('products').truncate()
      .then(() => {
        res.json({ message: 'Product list cleared.' })
      })
      .catch(err => {
        res.json({ message: `There was an error resetting product list: ${err}.` })
      })
  }
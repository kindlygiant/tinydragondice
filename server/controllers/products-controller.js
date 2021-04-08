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
        'name': req.body.name,
        'cost': req.body.cost,
        'qty': req.body.qty,
        'shortDesc': req.body.shortDesc,
        'longDesc': req.body.longDesc
      })
      .then(() => {
        res.json({ message: `Product \'${req.body.title}\' created.` })
      })
      .catch(err => {
        res.json({ message: `There was an error creating ${req.body.title}: ${err}` })
      })
  }
  
  // Remove specific product
  exports.deleteProduct = async (req, res) => {
    knex('products').where('id', req.body.id).del()
      .then(() => {
        res.json({ message: `Product ${req.body.id} deleted.` })
      })
      .catch(err => {
        res.json({ message: `There was an error deleting ${req.body.id}: ${err}` })
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
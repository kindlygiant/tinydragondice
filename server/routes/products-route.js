//tinydragondice/server/routes/products-route.js
const express = require('express');
const productRoutes = require('./../controllers/products-controller');
const router = express.Router();

// Add route for GET request to retrieve all product
// In server.js, products route is specified as '/products'
// this means that '/all' translates to '/products/all'
router.get('/all', productRoutes.getAllProducts);

// Add route for POST request to create new product
// In server.js, products route is specified as '/products'
// this means that '/create' translates to '/products/create'
router.post('/create', productRoutes.createProduct);

// Add route for PUT request to delete specific product
// In server.js, products route is specified as '/products'
// this means that '/delete' translates to '/products/delete'
router.put('/delete', productRoutes.deleteProduct)

// Add route for PUT request to reset product list
// In server.js, products route is specified as '/products'
// this means that '/reset' translates to '/products/reset'
router.put('/reset', productRoutes.removeAllProducts)

// Export router
module.exports = router
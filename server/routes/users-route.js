//tinydragondice/server/routes/users-route.js
const express = require('express');
const userRoutes = require('./../controllers/users-controller');
const router = express.Router();

// Add route for GET request to retrieve all product
// In server.js, users route is specified as '/users'
// this means that '/all' translates to '/users/all'
router.get('/', userRoutes.getAllUsers);

// Add route for POST request to create new product
// In server.js, users route is specified as '/users'
// this means that '/create' translates to '/users/create'
router.post('/', userRoutes.createUser);

// Add route for PUT request to delete specific product
// In server.js, users route is specified as '/users'
// this means that '/delete' translates to '/users/delete'
router.put('/:pid', userRoutes.updateUser);

// Add route for DELETE request to delete specific product
// In server.js, users route is specified as '/users'
// this means that '/delete' translates to '/users/delete'
router.delete('/:pid', userRoutes.deleteUser);

// Add route for PUT request to reset product list
// In server.js, users route is specified as '/users'
// this means that '/reset' translates to '/users/reset'
router.delete('/', userRoutes.removeAllUsers)

// Export router
module.exports = router
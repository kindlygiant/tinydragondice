//tinydragondice/server/server.js
const express = require('express')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')

const productsRouter = require('./routes/products-route')
const usersRouter = require('./routes/users-route')
const knex = require('./db')

const PORT = process.env.PORT || 3001

const app = express()

// Middleware
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

//Routes
app.use('/products', productsRouter)
app.use('/users', usersRouter)

app.post('/login', function(req,res) {
    if(!req.body.email || !req.body.password){
        res.status("400");
        res.send("Invalid details!");
    } else {
        knex.select('*').from('users')
        .then(userData => {
            userData.filter(function(user){
                if(user.username === req.body.email){
                    res.json({
                        "email": user.username,
                        "password": user.password,
                        "isAdmin": user.isAdmin
                    })
                }
            })
        })
        .catch(err => {
            res.json({ message: `There was an error retrieving the Users: ${err}` })
        })
    }
})

app.post('/signup', function(req, res){
    if(!req.body.id || !req.body.password){
       res.status("400");
       res.send("Invalid details!");
    } else {
        userController.getAllUsers(req, res).filter(function(user){
          if(user.id === req.body.id){
             res.render('signup', {
                message: "User Already Exists! Login or choose another user id"});
          }
       });
       var newUser = {id: req.body.id, password: req.body.password};
       //userController.createUser(req, res).push(newUser);
       req.session.user = newUser;
       res.redirect('/home');
    }
 });

//500
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke.')
})

//404
app.use(function (req, res, next) {
    res.status(404).send('OOPies No page found.')
})

//Start the app
app.listen(PORT, function() {
    console.log(`Server is running on ${PORT}`)
})
// Import express
const express = require('express')

// Set your app up as an express app
const app = express()

const exphbs = require('express-handlebars')
const req = require('express/lib/request')

// Set up to handle POST requests
app.use(express.json())     // needed if POST data is in JSON format
// app.use(express.urlencoded())  // only needed for URL-encoded input

app.use(express.static('public'))

// Tells the app to send the string: "Our demo app is working!" when you hit the '/' endpoint.
app.get('/', (req,res) => { 
    res.render('index.hbs') 
})

const submitRouter = require('./routes/submitRouter')

app.use('/submission', submitRouter)


// middleware to log a message each time a request arrives at the server - handy for debugging
app.use((req,res,next) => {
    console.log('message arrived: ' + req.method + ' ' + req.path)
    next()
})


app.engine('hbs', exphbs.engine({      // configure Handlebars 
    defaultlayout: 'main', 
    extname: 'hbs' 
})) 
 
app.set('view engine', 'hbs')   // set Handlebars view engine

// Tells the app to listen on port 3000 and logs tha tinformation to the console.
app.listen(3000, () => {
    console.log('Demo app is listening on port 3000!')
})

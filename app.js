const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const urlencoderParser = bodyParser.urlencoded({ extended: false})

const app = express()
// app.use(helmet())
app.use(express.static('public'))


app.set('view engine', './views')

const port = 3000

/* --------------[ ROUTER ]----------------- */

// Page d'accueil [GET]
app.get('/', (req, res) => {
    res.render('index.pug')
})


// Page d'inscription [GET]
app.get('/signup', (req, res) => {
    res.render('signup.pug')
})
// Page d'inscription [POST]
app.post('/signup', urlencoderParser, (req, res) => {
    console.log('');
    console.log('POST/signup -> Email:', req.body.email);
    console.log('POST/signup -> Password:', req.body.password);
    res.render('signup.pug')
})


// Page d'authentification [GET]
app.get('/signin', (req, res) => {
    res.render('signin.pug')
})
// Page d'authentification [POST]
app.post('/signin', urlencoderParser, (req, res) => {
    console.log('');
    console.log('POST/signin -> Email:', req.body.email);
    console.log('POST/signin -> Password:', req.body.password);
    res.render('signin.pug')
})


// Page admin [GET]
app.get('/admin', (req, res) => {
    res.render('admin.pug')
})


// Page de chat [GET]
app.get('/chat', (req, res) => {
    res.render('chat.pug')
})


// Page d'erreur
app.get('*', (req, res) => {
    res.status(404).render('404.pug')
})


/* --------------[ END ROUTER ]----------------- */

// Debug
app.listen(port, () => 
    console.log(`le serveur express est lancé sur le port ${port}`)
)
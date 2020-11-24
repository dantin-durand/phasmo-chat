const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const urlencoderParser = bodyParser.urlencoded({ extended: false})

const { User } = require('./models')
const { Op } = require('sequelize')

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
app.post('/signup', urlencoderParser, async (req, res) => {
    try {
        console.log('POST/signup -> Email:', req.body);
        const { email, username, password } = req.body
        const [user, created] = await User.findOrCreate({
            where: { [Op.or]: [{email}, {username}] },
            defaults: {
                email,
                username,
                password,
                isAdmin: true
            },
        })
        if(!created) {
            return res.status(400).render('signup.pub')
        }
        console.log('POST/signup -> Utilisateur créé:', user);
        res.status(200).render('signup.pug')
    } catch (error) {
        res.status(500).render('500.pug')
    }
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
app.get('/admin', async (req, res) => {
    try {
        const users = await User.findAll();
        console.log('users ->', users)
        res.status(200).render('admin.pug', { users })
    } catch (error) {
        console.error(error)
        res.status(500).render('500.pug')
    }
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
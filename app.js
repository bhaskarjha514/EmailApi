const mongoose = require('mongoose')
const express = require('express')
const user = require('./models/User')
const auth = require('./models/Auth')
const mailer = require('./utils/SendMail')
const app = express()
const exphbs = require('express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')

const PORT = process.env.PORT || 5000

// express
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect('mongodb+srv://admin:admin123@cluster0.djnew.mongodb.net/<dbname>?retryWrites=true&w=majority',{useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => {
        console.log('db Connected 🔥')
    })
    .catch(() => {
        console.log('db Fucked up 😛')
    })

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// static folder
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('contact')
})

app.get('/signup', async (req, res, next)=>{
    res.render('contact2')
})

app.post('/signup', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    console.log(email+password)
    const userdata = new user({
            email,
            password,
    })
    
    msg = mailer.mailer(email)
    if(msg){
        return res.status(400).json({'message' : 'Cannot Send activation mail ! Check your email and try again'})
        }
    await userdata.save(async (err, response) => {
        if (err) res.status(500).json({ 'message': 'Already signup' })
        res.render('contact2')
       })

})
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })

if(process.env.NODE_ENV !== 'production'){
    // require('dotenv').parse()
    const dotenv = require('dotenv')
    const result = dotenv.config()

    if (result.error) {
      throw result.error
    }
    
    console.log(result.parsed)

    // const buffer = Buffer.from('DATABASE_URL=mongodb://localhost/library')
    const config = dotenv.parse(result)
}


const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

const mongoose = require('mongoose')
// main().catch(err => console.log(err))
// async function main(){
//     console.log(process.env.DATABASE_URL)
//     await mongoose.connect(process.env.DATABASE_URL, {
//         useNewUrlParser: true
//     })
// }
// mongoose.connect('mongodb://127.0.0.1:27017/test')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongoose.'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)


app.listen(process.env.PORT || 3000)
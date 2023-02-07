const express = require('express')
const { route } = require('.')
const Author = require('../models/authors')

const router = express.Router()

// All Authors route
router.get('/', async (req, res)=>{
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        })
    } catch{
        res.redirect('/')
    }
})

// New Author route
router.get('/new', (req, res)=>{
    // the object doesn't save anything to authors but does create Auhtors
    // which we can use to save, delete and update things inside the
    // database and also gives us object that we can use inside our ejs file
    res.render('authors/new', {author: new Author() })
})

// Create new Auhtor route
router.post('/', async (req, res)=>{
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch{
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating author'
        })
    }
    // res.send(req.body.name)
})

module.exports = router
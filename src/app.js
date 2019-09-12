const path = require('path')
const express = require('express')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.set('partials', partialsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Lalaina Ramarivelo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Lalaina Ramarivelo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        helpText: 'This is some helpful text.',
        name: 'Lalaina Ramarivelo'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'please provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if (error) {
            return res.send({error })
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if (error) {
                return res.send({error})
            }

            res.send({
                address:req.query.address,
                location,
                forecastData
            })

        })
    })

})

app.get('/products', (req,res)=>{

    if (!req.query.search) {
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query)

    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        title:'404',
        msg:'Help article not found',
        name: 'Lalaina Ramarivelo'
    })
})
app.get('*', (req,res)=>{
    res.render('404', {
        title:'404',
        msg:'404 not found',
        name: 'Lalaina Ramarivelo'
    })
})
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
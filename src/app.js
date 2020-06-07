const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


const publicFilePath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicFilePath))
app.set('views', viewPath)
app.set('view engine','hbs')

hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('index',{
        title: 'Počasí',
        name: 'maty'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About',
        name: 'maty'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help',
        message: 'I need somebody',
        name: 'maty'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.adress){
        return res.send({
            error: 'You have to search something dumbass'
        })
    }

    geocode(req.query.adress, (error, {longitude, latitude, place} = {}) => {
        if (error){
            return res.send({error})
        }

        forecast(longitude,latitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                place,
                forecastData,
                search: req.query.adress
            })
        })
    })
})


app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'maty',
        errorMessage: 'Help not found'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`server is up and running on ${port}`)
})
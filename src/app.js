const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//create express instance
const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars view engine & views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App 2020",
        name: "Tracey Jones"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "An About Page",
        name: "Tracey Jones"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        message: "This is a help message.",
        name: "Tracey Jones"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.render('404', {
            message: "Please provide a location.",
            name: "Tracey Jones"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
           return res.render('404', {
            message: error,
            name: "Tracey Jones"
            });
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) { 
                return res.render('404', {
                    message: "error",
                    name: "Tracey Jones"
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        }) 
    })    
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Help Page",
        message: "Help article not found",
        name: "Tracey Jones"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "Error 404:",
        message: "Page Not Found",
        name: "Tracey Jones"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
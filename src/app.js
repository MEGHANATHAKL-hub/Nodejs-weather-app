const express = require('express')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')
const path = require('path')
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.get('', (req, res) => {
    res.render('index')
})

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'This is helpfull text',
        
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'meghanatha',
        class:9
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "must provide the address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={})=> {
        if (error) {
            return res.send({error: error})
        }

        forecast(latitude, longitude, (error, result)=> {
            if (error) {
                return res.send({error: error})
            }
            console.log(result)
            res.send({
                forecastdata : result,
                location,
                address : req.query.address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404page');
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
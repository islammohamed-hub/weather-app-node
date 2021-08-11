const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

// Getting path for express config
const indexPagePath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(indexPagePath));

app.get('',(req,res) => {
    res.render('index',{
        appName: 'Weather App',
        madeBy: 'Islam Mohamed'
    })
});

app.get('/about',(req,res) => {
    res.render('about',{
        appName: 'About us',
        madeBy: 'Islam Mohamed'
    })
});

app.get('/help',(req,res) => {
    res.render('help',{
        appName: 'Help',
        message: "Please contact us if you run into any problem",
        madeBy: 'Islam Mohamed'
    })
});

app.get('/weather',(req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address,(error , { location , longitude , latitude } = {}) => {
        if (error) {
            return res.send({ error }) 
        }
        forecast(latitude,longitude, (error, forecastData) => {
           if (error) {
                return res.send( {error });
           }
           res.send({
            location,
            forecastData
           })
        })
    })
});

app.get('/help/*',(req,res) => {
    res.render('404page',{
        errorMessage:'Help articale not found'
    })
})

app.get('*',(req,res) => {
    res.render('404page',{
        errorMessage:'Page Not found'
    })
})

app.listen(port, () => {
    console.log(`server is listing on PORT ${port}`);
});
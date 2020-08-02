//node modules
const path = require('path');


//npm package
const express = require('express');
const app = express();
const hbs = require('hbs');

//files
const forecast = require('../utils/forecast');
const geoCode = require('../utils/geocode');



//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

//index page
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather app home",
        name: "Weatherly",
        author: "Nitesh"
    })
})


//about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: "Weather app about",
        name: "Weather",
        author: "Nitesh"
    })
})

//help page
app.get('/help', (req, res) => {

    res.render('help', {
        title: "Weather app help",
        name: "Weatherly",
        author: "Nitesh"
    })
})



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, { temp, humid } = {}) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: `It is currently ${temp} degree celcius with ${humid}% chances of raining.`,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     weather: 'rainy',
    //     location: "jhapa",
    //     address: req.query.address
    // });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must have a search term"
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        author: "Nitesh",
        errorMsg: 'Help Article Not Found'
    });
})
//wild card to math anything in the url *
app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        author: "Nitesh",
        errorMsg: 'Page Not Found'
    });
});


app.listen(3000, () => {
    console.log("Server started");
})

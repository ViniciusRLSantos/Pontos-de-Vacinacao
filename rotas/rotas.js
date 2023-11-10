// Aqui ficarão as rotas do app
// WIP
const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const Models = require('../models/model')

var jsonParser = bodyParser.json();
var urlEncoderParser = bodyParser.urlencoded({ extended: false })

// Páginas principais
router.get('/', async (request, response) => {    
    try {
        const cidades = await Models.CityModel.find();
        response.render('index',  { cidades: cidades })
    } catch (error) {
        console.log(error)
    }
});

// **CRUD**
// POST
router.post('/city/add', urlEncoderParser, (request, response) => {
    var inputCityName = request.body.city_name;
    console.log(inputCityName);
    try {
        if (inputCityName) {
            var cidade = new Models.CityModel({ city: inputCityName, pontos: []});
            cidade.save();
            console.log(`Added ${cidade.city}`);
            response.redirect('/');
        }
        
    } catch (error) {
        console.log(error);
    }
    
});

router.post('/:city/add-ponto', async (request, response)=>{
    var cidade = request.params.city;
    try {
        const ponto = new Models.PontoModel({
            endereco: request.body.endereco,
            mapa_url: request.body.mapa_url,
            abertura: request.body.abertura,
            fechamento: request.body.fechamento
        });
        ponto.save();

        const city = await Models.CityModel.findOneAndUpdate({city: cidade}, {pontos: ponto});
        city.save();
        response.json(await Models.CityModel.find());
    } catch (error) {
        console.log(error);
        response.send(error);
    }
});

// GET
router.get('/city', (request, response) => {
    console.log(request.body);
    response.render('city');
});

// GET
router.get('/:city/add-ponto', (request, response) => {
    const cidade = request.params.city;
    response.render('addpoint', {cidade: cidade});
});

// UPDATE/PATCH

// DELETE


module.exports = router;

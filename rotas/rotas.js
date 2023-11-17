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
        console.log(error);
    }
});

// **CRUD**
// POST
router.post('/admin/city/add', urlEncoderParser, (request, response) => {
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

router.post('/admin/add-ponto/:_city', urlEncoderParser, async (request, response)=>{
    var cidade = request.params._city;
    console.log('City ID: ', cidade);
    const ponto = new Models.PontoModel({
        endereco: request.body.endereco,
        mapa_url: request.body.mapa_url
    });
    var vac_array = []
    for (const vacina in request.body) {
        if (request.body[vacina] == 'true') {
            var vac = await Models.VacinaModel.find({ nome: vacina }).exec();
            console.log(vac[0]);
            ponto.vacinas.push(vac[0]);
            console.log('Adicionado: ', vacina);
        }
    };
    await ponto.save();
    console.log(vac_array);
    const city = await Models.CityModel.findByIdAndUpdate(cidade, {$push: {pontos: ponto}});

    response.redirect('/')
    
});

// GET
router.get('/admin/city', (request, response) => {
    console.log(request.body);
    response.render('city');
});

// GET
router.get('/add-ponto/:_city', urlEncoderParser, async (request, response) => {
    console.log(request.body.CoronaVAC);
    const cidade = request.params._city;
    const vacinas = await Models.VacinaModel.find();
    response.render('addpoint', {cidade: cidade, vacinas: vacinas});
});

router.get('/city-info/:city', async (request, response) => {
    const city_id = request.params.city;
    const cidade = await Models.CityModel.findById(city_id);

    response.render('cityinfo', { cidade: cidade})
});

// UPDATE/PATCH

// DELETE


module.exports = router;

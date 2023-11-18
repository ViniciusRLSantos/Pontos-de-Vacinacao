const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const Models = require('../models/model')

var jsonParser = bodyParser.json();
var urlEncoderParser = bodyParser.urlencoded({ extended: false })

// Página Inicial
router.get('/', async (request, response) => {  
    try {
        const cidades = await Models.CityModel.find();
        response.render('index',  { cidades: cidades })
    } catch (error) {
        console.log(error);
    }
});

// Páginas da API

router.get('/api', (request, response) => {
    response.render('api');
});

// Retorna os pontos de uma cidade
router.get('/api/pontos/:cidade', async (request, response) => {
    
    try {
        const cidade_id = request.params.cidade;
        const cidade = await Models.CityModel.findById(cidade_id);
        response.json(cidade.pontos);
    } catch (error) {
        console.log(error);
        response.send(error);
    }
    
});

// Retorna as cidades disponíveis com seu nome e id
router.get('/api/cidades', async (request, response) => {
    
    try {
        const cidade = await Models.CityModel.find().exec();
        var array_cidades = [];
        cidade.forEach(info => {
            array_cidades.push({ nome: info.city, id: info._id });
        });
        response.send(array_cidades);
    } catch (error) {
        console.log(error);
        response.send(error);
    }
    
});

router.get('/api/cidades/:id', async (request, response) => {
    
    try {
        const cidade = await Models.CityModel.findById(request.params.id);
        response.json(cidade);
    } catch (error) {
        console.log(error);
        response.send(error);
    }
    
});

// ** ADMIN CRUD **
// POST
// Adiciona uma cidade ao banco de dados
router.post('/admin/cidade/add', urlEncoderParser, (request, response) => {
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

// Adiciona um ponto de vacinação numa cidade
router.post('/admin/add-ponto/:_city', urlEncoderParser, async (request, response)=>{
    var cidade = request.params._city;
    const ponto = new Models.PontoModel({
        endereco: request.body.endereco,
        mapa_url: request.body.mapa_url
    });
    var vac_array = []
    for (const vacina in request.body) {
        if (request.body[vacina] == 'true') {
            var vac = await Models.VacinaModel.find({ nome: vacina }).exec();
            ponto.vacinas.push(vac[0]);
        }
    };
    await ponto.save();
    console.log(vac_array);
    const city = await Models.CityModel.findByIdAndUpdate(cidade, {$push: {pontos: ponto}});
    response.redirect('/')
    
});

// GET
router.get('/admin/cidade/add', (request, response) => {
    console.log(request.body);
    response.render('city');
});

// GET
router.get('/admin/add-ponto/:_city', urlEncoderParser, async (request, response) => {
    console.log(request.body.CoronaVAC);
    const cidade = request.params._city;
    const vacinas = await Models.VacinaModel.find();
    response.render('addpoint', {cidade: cidade, vacinas: vacinas});
});

router.get('/info/:city', async (request, response) => {
    const city_id = request.params.city;
    const cidade = await Models.CityModel.findById(city_id);

    response.render('cityinfo', { cidade: cidade})
});
// to do

// UPDATE/PATCH

// DELETE


module.exports = router;

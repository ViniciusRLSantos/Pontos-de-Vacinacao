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

// Página Admin
router.get('/admin', async (request, response) => {
    const cidades = await Models.CityModel.find();
    response.render('admin', { cidades: cidades});
})

// Informações da cidade
router.get('/info/:city', async (request, response) => {
    const city_id = request.params.city;
    const cidade = await Models.CityModel.findById(city_id);

    response.render('cityinfo', { cidade: cidade})
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
    try {
        if (inputCityName) {
            var cidade = new Models.CityModel({ city: inputCityName, pontos: []});
            cidade.save().then(() => {
                response.redirect('/');
            });
        }
        
    } catch (error) {
        console.log(error);
    }
    
});

// Adiciona um ponto de vacinação numa cidade
router.post('/admin/add-ponto/:_city', urlEncoderParser, async (request, response)=>{
    var cidade = request.params._city;
    //var end = request.body.endereco + ', ' + request.body.numero + ' - ' + request.body.bairro;
    const ponto = new Models.PontoModel({
        endereco: request.body.endereco,
        numero: request.body.numero,
        bairro: request.body.bairro,
        mapa_url: request.body.mapa_url,
        cnpj: request.body.cnpj,
        email: request.body.email,
        abertura: request.body.abertura,
        fechamento: request.body.fechamento
    });
    
    for (const vacina in request.body) {
        if (request.body[vacina] == 'true') {
            var vac = await Models.VacinaModel.find({ nome: vacina }).exec();
            ponto.vacinas.push(vac[0]);
        }
    };
    await ponto.save();
    await Models.CityModel.findByIdAndUpdate(cidade, {$push: {pontos: ponto}}).then(() => {
        response.redirect('/');
    });
    
    
});

// Forms
router.get('/admin/cidade/add', (request, response) => {
    response.render('city');
});

router.get('/admin/add-ponto/:_city', urlEncoderParser, async (request, response) => {
    const cidade = request.params._city;
    const vacinas = await Models.VacinaModel.find();
    response.render('addpoint', {cidade: cidade, vacinas: vacinas});
});

// to do

// UPDATE/PATCH

// DELETE
router.get('/admin/delete/:ponto_id/:cidade_id', async (request, response) =>{
    const id_ponto = request.params.ponto_id;
    const id_cidade = request.params.cidade_id;
    try {
        const cidade = await Models.CityModel.findOne({_id: id_cidade});
        await Models.PontoModel.findByIdAndDelete(id_ponto);

        cidade.pontos.splice(cidade.pontos.findIndex(p => p._id === id_ponto), 1);
        cidade.save().then(() => {
            response.redirect(`/info/${id_cidade}`);
        });
    } catch (error) {
        response.send(error);
        console.log(error);
    }
    

})


module.exports = router;

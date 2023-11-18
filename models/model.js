const mongoose = require('mongoose');

// Nome da Vacina
var VacinaSchema = new mongoose.Schema({
    nome: String
})

// Dados sobre o ponto de vacinação
const PontoSchema = new mongoose.Schema({
    endereco: {
        required: true,
        type: String
    },
    numero: {
        type: Number,
        required: true
    },
    bairro: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    cnpj: {
        type: String
    },
    vacinas: {
        type: [VacinaSchema]
    },
    telefone: {
        type: String,
        default: '(82) 3333-4444'
    },
    mapa_url: {
        type: String
    },
    abertura: String,
    fechamento: String
});

// Dados da cidade
const CidadeSchema = new mongoose.Schema({
    city: {
        type: String
    },
    pontos: {
        type: [PontoSchema]
    }
});

const CityModel = mongoose.model('Cidade', CidadeSchema);
const PontoModel = mongoose.model('Ponto', PontoSchema);
const VacinaModel = mongoose.model('Vacina', VacinaSchema);

/*
const vacina1 = new VacinaModel({nome: 'CoronaVAC'});
const vacina2 = new VacinaModel({nome: 'Pfizer'});
const vacina3 = new VacinaModel({nome: 'Astrazenica'});
const vacina4 = new VacinaModel({nome: 'Janssen'});
*/
module.exports = { CityModel, PontoModel, VacinaModel };
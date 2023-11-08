const mongoose = require('mongoose');

// Nome da Vacina
var Vacina = new mongoose.Schema({
    nome: String
})

// Dados sobre o ponto de vacinação
const Ponto = new mongoose.Schema({
    endereco: {
        required: true,
        type: String
    },
    vacinas: {
        required: true,
        type: [Vacina]
    },
    mapa_url: {
        type: String
    },
    abertura: {
        type: Date
    },
    fechamento: {
        type: Date
    }
});

// Dados da cidade
const Cidade = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    pontos: [Ponto]
});

module.exports = mongoose.model('Cidade', Cidade)
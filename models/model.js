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
    vacinas: {
        type: [VacinaSchema]
    },
    mapa_url: {
        type: String
    }
});

// Dados da cidade
const CidadeSchema = new mongoose.Schema({
    city: {
        type: String,
        default: "Maceió"
    },
    pontos: {
        type: [PontoSchema]
    }
});

const CityModel = mongoose.model('Cidade', CidadeSchema);
const PontoModel = mongoose.model('Ponto', PontoSchema);
const VacinaModel = mongoose.model('Vacina', VacinaSchema);



module.exports = { CityModel, PontoModel, VacinaModel };
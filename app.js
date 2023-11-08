// Imports
require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');

// Constantes
const PORTA = process.env.PORT || 3000;
const app = express();
const mongoString = process.env.MONGOOSE_URI;

// Conectar o banco de dados
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});
database.once('connected', () => {
    console.log('Database Connected');
});

// Static
app.use(express.static('public'))

// Template
app.use(express.json());
app.use(expressLayout);
app.set('layout', './layouts/base');
app.set('view engine', 'ejs');

// Rotas
const rotas = require('./rotas/rotas');
app.use('/', rotas);

// Inicializando o servidor
app.listen(PORTA, () => {
    console.log(`Servidor iniciado na porta ${PORTA}`)
});
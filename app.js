// Imports
require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');

const connectDB = require('./models/db');

// Constantes
const PORTA = process.env.PORT || 3000;
const app = express();

// Conectar o banco de dados
connectDB();

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
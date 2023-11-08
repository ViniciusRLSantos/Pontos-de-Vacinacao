// Aqui ficarão as rotas do app
// WIP
const express = require('express');
const router = express.Router();

// Páginas principais
router.get('/', (request, response) => {
    try {
        response.render('index')
    } catch (error) {
        console.log(error)
    }
    
});

// **CRUD**
// POST

// GET

// UPDATE/PATCH

// DELETE


module.exports = router;

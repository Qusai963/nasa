const path = require('path');

const express = require('express');
const cors = require('cors');
const planetRouter = require('./routes/planets/planets.router');

const app = express();

app.use(cors())

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

app.use(planetRouter);

module.exports = app; 
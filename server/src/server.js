const http = require('http');

require('dotenv').config();

const app = require('./app');
const { loadPlanetData } = require('./models/planets.model');
const { loadLunchData } = require('./models/launches.model');
const { mongoConnect } = require('./services/mongo');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
    await mongoConnect();
    await loadPlanetData();
    await loadLunchData();

    server.listen(PORT, () => {
        console.log('Starting server on port ' + PORT);
    });
}

startServer();

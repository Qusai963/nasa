// const axios = require('axios');

const launchesMongo = require('./launches.mongo');
const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;
const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};

saveLaunch(launch);

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function loadLunchesData() {
    console.log('Loading launch data...');
    // axios.post(SPACEX_API_URL, {
    //     query: {},
    //     options: {
    //         populate: [

    //         ]
    //     }
    // })
}

async function existsLaunchWithId(launchId) {
    return await launches.findOne({flightNumber: launchId});
}

async function getLatestFlightNumber() {
    const latestLaunch = await launches.findOne({}).sort('-flightNumber');

    if(!latestLaunch)
        return DEFAULT_FLIGHT_NUMBER;

    return latestLaunch.flightNumber;
}

async function scheduleNewLaunch() {
    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Qusai', 'NASA'],
        flightNumber: newFlightNumber,
});
await saveLaunch(newLaunch);
}

async function getAllLaunches() {
    return await launchesMongo.
    find({}, { '_id': 0, '__v': 0});
}

async function saveLaunch() {
    const planet = await planets.findOne({
        keplerName: launch.target
    });
    
    if(!planet) {
        throw new Error('no matching planet found');
    }

    await launches.updateOne({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true
    });
}

async function abortLaunchById(launchId) { 
    const aborted = await launches.updateOne({
        flightNumber: launchId
    }, {
            upcoming: false,
            success: false,
        });

        return aborted.ok === 1;
}

module.exports = {
    loadLunchesData,
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById
}
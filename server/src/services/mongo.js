const { mongoose } = require("mongoose");

const mongoURI = 'mongodb://127.0.0.1:27017/nasa';

async function mongoConnect() {
    await mongoose.connect(mongoURI);
}

module.exports = {mongoConnect};
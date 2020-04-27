const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('src/db/data.json');
const client = low(adapter);

module.exports = client;

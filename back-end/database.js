const {Client} = require('pg');
const dotenv = require('dotenv')

dotenv.config();

const client = new Client({
    user: process.env.postgres_user,
    password: process.env.postgres_password,
    host: process.env.postgres_host,
    port: process.env.postgres_port,
    database: process.env.postgres_database
});

client.connect();
module.exports = client;
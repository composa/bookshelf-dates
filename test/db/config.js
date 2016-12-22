import path from 'path';

const connection = process.env.DATABASE_URL || '';

const seeds = {
    directory: path.join(__dirname, 'seeds')
};

const migrations = {
    directory: path.join(__dirname, 'migrations'),
    tableName: '_migrations'
};

const postgres = {
    seeds,
    migrations,
    client: 'pg',
    connection,
    pool: {
        min: 2,
        max: 10
    }
};

const sqlite3 = {
    seeds,
    migrations,
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, '..', '..', 'dev.sqlite3')
    },
    useNullAsDefault: true
};

const memory = {
    seeds,
    migrations,
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: ':memory:'
    }
};

export default {
    memory,
    sqlite3,
    postgres
};

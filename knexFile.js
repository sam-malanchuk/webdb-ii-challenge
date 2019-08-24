module.exports = {
    development: {
        client: 'sqlite3',
        connections: {
            filename: './data/cars.db3'
        },
        useNullAsDefault: true,
        migrations: {
            directory: './data/migrations'
        },
        seeds: {
            directory: './data/seeds'
        }
    }
}
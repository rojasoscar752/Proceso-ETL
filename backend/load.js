const { Client } = require("pg");

async function loadMovies(movies) {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: process.env.POSTGRES_PORT
    });

    await client.connect();

    for (const movie of movies) {
        await client.query(
            "INSERT INTO movies (title, year, decade, rating, category, adjusted_score) VALUES ($1, $2, $3, $4, $5, $6)",
            [movie.title, movie.year, movie.decade, movie.rating, movie.category, movie.adjustedScore]
        );
    }

    await client.end();
}

module.exports = loadMovies;

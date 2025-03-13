require("dotenv").config();
const express = require("express");
const neo4j = require("neo4j-driver");
const transformMovies = require("./transform");
const loadMovies = require("./load");

const app = express();
const PORT = process.env.EXPRESS_PORT || 3000;

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD),
    { encrypted: "DISABLED" }
);

app.get("/api/extract", async (req, res) => {
    const session = driver.session();
    try {
        const result = await session.run("MATCH (m:Movie) RETURN m.title AS title, m.year AS year, m.rating AS rating");
        const movies = result.records.map(record => {
            const title = record.get("title");
            const yearField = record.get("year");
            const ratingField = record.get("rating");

            return {
                title: title || "Desconocido",
                year: yearField ? (yearField.low !== undefined ? yearField.low : yearField) : null,
                rating: ratingField !== null ? ratingField : 0
            };
        });

        const transformedMovies = transformMovies(movies);
        await loadMovies(transformedMovies);

        res.json({ message: "Datos transformados y cargados en PostgreSQL", data: transformedMovies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await session.close();
    }
});

app.listen(PORT, () => {
    console.log(`🚀 API corriendo en http://localhost:${PORT}`);
});


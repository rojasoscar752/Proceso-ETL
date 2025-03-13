require("dotenv").config();
const express = require("express");
const neo4j = require("neo4j-driver");
const transformMovies = require("./transform");
const loadMovies = require("./load");

const app = express();
const PORT = process.env.EXPRESS_PORT || 3000;

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

app.get("/api/extract", async (req, res) => {
    const session = driver.session();
    try {
        const result = await session.run("MATCH (m:Movie) RETURN m.title AS title, m.year AS year, m.rating AS rating");
        const movies = result.records.map(record => ({
            title: record.get("title"),
            year: record.get("year").low,
            rating: record.get("rating")
        }));

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

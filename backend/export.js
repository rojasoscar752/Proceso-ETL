const fs = require("fs");
const { Client } = require("pg");

async function exportToCSV() {
    const client = new Client({ ... });
    await client.connect();

    const result = await client.query("SELECT * FROM movies");
    const movies = result.rows;

    fs.writeFileSync("/mnt/export/recap.csv", movies.map(m => `${m.title},${m.year}`).join("\n"));
    await client.end();
}

exportToCSV();

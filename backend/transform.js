function transformMovies(movies) {
    return movies.map(movie => {
        const transformedTitle = movie.title.toLowerCase().replace(/\s+/g, "-");
        let category = movie.rating <= 5 ? "Mala" : movie.rating <= 7 ? "Regular" : "Buena";
        const decade = Math.floor(movie.year / 10) * 10;
        const adjustedScore = (movie.rating * 2) - (2025 - movie.year) / 10;

        return {
            title: transformedTitle,
            year: movie.year,
            decade,
            rating: movie.rating,
            category,
            adjustedScore: adjustedScore.toFixed(2)
        };
    });
}

module.exports = transformMovies;

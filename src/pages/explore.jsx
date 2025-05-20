import { Link } from "react-router-dom";
import Layout from "../components/layout";
import { useEffect, useState } from "react";
import "../styles/pages/_explore.scss";

export default function Explore() {
    // State til at holde film, anbefalede film og den valgte kategori
    const [movies, setMovies] = useState([]);
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [category, setCategory] = useState("now_playing");

    useEffect(() => {
        // Funktion til at hente film baseret på den valgte kategori
        async function fetchMovies() {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${category}?api_key=d53faa548947914998a2cd2461c8ae72`
                );
                const data = await response.json();
                setMovies(data.results);

                // Hvis der er film, hentes anbefalinger baseret på den første film
                if (data.results.length > 0) {
                    const firstMovieId = data.results[0].id;
                    fetchRecommendedMovies(firstMovieId);   
                }
            } catch (error) {
                console.error("Fejl ved hentning af film:", error);
            }
        }

        // Funktion til at hente anbefalede film baseret på en film-id
        async function fetchRecommendedMovies(movieId) {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=d53faa548947914998a2cd2461c8ae72`
                );
                const data = await response.json();

                // Henter detaljer for hver anbefalet film, inkl. genre
                const detailedMovies = await Promise.all(
                    data.results.map(async (movie) => {
                        const movieDetailsResponse = await fetch(
                            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=d53faa548947914998a2cd2461c8ae72`
                        );
                        const movieDetails = await movieDetailsResponse.json();
                        return {
                            ...movie,
                            genre: movieDetails.genres?.[0]?.name || "Ukendt",
                        };
                    })
                );

                setRecommendedMovies(detailedMovies);
            } catch (error) {
                console.error("Fejl ved hentning af anbefalede film:", error);
            }
        }

        // Kalder funktionen til at hente film, når kategorien ændres
        fetchMovies();
    }, [category]);

    return (
        <Layout>
            <div className="tabs">
                <button
                    className={`tabs__button ${category === "now_playing" ? "active_explore" : ""}`}
                    onClick={() => setCategory("now_playing")}
                >
                    now showing
                </button>
                <button
                    className={`tabs__button ${category === "upcoming" ? "active_explore" : ""}`}
                    onClick={() => setCategory("upcoming")}
                >
                    upcoming
                </button>
            </div>
            <section className="top-movies">
                <div className="top-movies__header">
                    <h2 className="top-movies__title">top movies</h2>
                    <p className="top-movies__text">see more</p>
                </div>
                <div className="top-movies__list">
                    {movies.map((movie) => (
                        <Link
                            to={`/details/${movie.id}`}
                            key={movie.id}
                            className="top-movies__item"
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <h3 className="top-movies__item-title">{movie.title}</h3>
                            <p className="top-movies__item-rating">⭐ {movie.vote_average} / 10</p>
                            
                        </Link>
                    ))}
                </div>
            </section>
            <section className="recommended">
    <div className="recommended__header">
        <h2 className="recommended__title">recommended</h2>
        <p className="recommended__text">see more</p>
    </div>
    <div className="recommended__list">
        {recommendedMovies.map((movie) => (
            <Link
                to={`/details/${movie.id}`}
                key={movie.id}
                className="recommended__item"
            >
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
                <h3 className="recommended__item-title">{movie.title}</h3>
                <p className="recommended__item-genre">{movie.genre}</p> 
            </Link>
        ))}
    </div>
</section>
        </Layout>
    );
}
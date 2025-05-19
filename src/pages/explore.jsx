import Layout from "../components/layout";
import { useEffect, useState } from "react";
import "../styles/pages/_explore.scss"; 
export default function Explore() {
        const [movies, setMovies] = useState([]);

        useEffect(() => {
            async function fetchMovies() {
                try {
                    const response = await fetch(
                        "https://api.themoviedb.org/3/movie/top_rated?api_key=d53faa548947914998a2cd2461c8ae72"
                    );
                    const data = await response.json();
                    setMovies(data.results);
                } catch (error) {
                    console.error("Error fetching movies:", error);
                }
            }
            fetchMovies();
        }, []);

        return (
            <Layout>
                <div className="tabs">
                    <button className="tabs__button">now showing</button>
                    <button className="tabs__button">upcoming</button>
                </div>
                <section className="top-movies">
                    <h2 className="top-movies__title">top movies</h2>
                    <div className="top-movies__list">
                        {movies.map((movie) => (
                            <div key={movie.id} className="top-movies__item">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <h3 className="top-movies__item-title">{movie.title}</h3>
                            </div>
                        ))}
                    </div>
                </section>
            </Layout>
        );
    }
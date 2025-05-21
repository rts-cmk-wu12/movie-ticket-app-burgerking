import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import "../styles/pages/_detail.scss";

export default function Details() {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}?api_key=d53faa548947914998a2cd2461c8ae72&append_to_response=credits,images`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch movie details");
                }
                const data = await response.json();
                setMovieDetails(data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
                setError(error.message);
            }
        }

        fetchMovieDetails();
    }, [movieId]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!movieDetails) {
        return <p>Loading...</p>;
    }

    const {
        poster_path,
        title,
        overview,
        genres,
        runtime,
        vote_average,
        credits,
    } = movieDetails;

    const director = credits?.crew?.find((person) => person.job === "Director")?.name;
    const formattedRuntime = `${Math.floor(runtime / 60)}h ${runtime % 60}m`;

    return (
        <Layout>
            <section className="details">
                <div className="details__container">
                    <div className="details__images">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                            alt={title}
                            className="details__poster"
                        />
                        {movieDetails.images?.backdrops.slice(0, 5).map((image, index) => (
                            <img
                                key={index}
                                src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                                alt={`Backdrop ${index + 1}`}
                                className="details__image"
                            />
                        ))}
                    </div>

                    
                    <div className="details__info">
                        <h2 className="details__title">{title}</h2>
                        <div className="details__rating-container">
                            <p className="details__director">Director: {director || "N/A"}</p>
                            <p className="details__rating">⭐ {Math.round(vote_average)} / 10</p>
                        </div>
                        <div className="details__tags">
                            {genres.map((genre) => (
                                <span key={genre.id} className="details__tag">
                                    {genre.name}
                                </span>
                            ))}
                            <span className="details__tag">{formattedRuntime}</span>
                        </div>
                        <h3 className="details__synopsis-title">Synopsis</h3>
                        <p className="details__synopsis">{overview} <span className="details__synopsis-span">Read more</span></p>
                        <Link to={`/seats/${movieId}`}>
                            <button className="details__button">Book Ticket</button>
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
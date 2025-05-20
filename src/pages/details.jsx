import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import "../styles/pages/_detail.scss";

export default function Details() {
    // Hent movieId fra URL-parametre
    const { movieId } = useParams();
    // State til at gemme filmens detaljer
    const [movieDetails, setMovieDetails] = useState(null);
    // State til at håndtere fejl
    const [error, setError] = useState(null);

    useEffect(() => {
        // Funktion til at hente filmens detaljer fra API
        async function fetchMovieDetails() {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}?api_key=d53faa548947914998a2cd2461c8ae72&append_to_response=credits`
                );
                if (!response.ok) {
                    throw new Error("Kunne ikke hente filmens detaljer");
                }
                const data = await response.json();
                setMovieDetails(data); // Gem data i state
            } catch (error) {
                console.error("Fejl ved hentning af filmens detaljer:", error);
                setError(error.message); // Gem fejlbesked i state
            }
        }

        fetchMovieDetails();
    }, [movieId]); // Kør når movieId ændres

    // Hvis der opstår en fejl, vis en fejlbesked
    if (error) {
        return <p>Fejl: {error}</p>;
    }

    // Vis en loading-tekst, mens data hentes
    if (!movieDetails) {
        return <p>Indlæser...</p>;
    }

    // Destrukturer data fra filmens detaljer
    const {
        poster_path,
        title,
        overview,
        genres,
        runtime,
        vote_average,
        credits,
    } = movieDetails;

    // Find instruktøren fra credits
    const director = credits?.crew?.find((person) => person.job === "Director")?.name;

    // Formater runtime som "Xh Ym"
    const formattedRuntime = `${Math.floor(runtime / 60)}h ${runtime % 60}m`;

    return (
        <Layout>
            <section className="details">
                <div className="details__container">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                        alt={title}
                        className="details__poster"
                    />
                    <div className="details__info">
                        <h2 className="details__title">{title}</h2>
                        
                        <div className="details__rating-container">
                            <p className="details__director">Director: {director || "N/A"}</p>
                            <p className="details__rating">⭐ {vote_average} / 10</p>
                        </div>
                        <div className="details__tags">
                            {genres.map((genre) => (
                                <span key={genre.id} className="details__tag">
                                    {genre.name}
                                </span>
                            ))}
                            <span className="details__tag">{formattedRuntime}</span>
                        </div>
                        <h3 className="details__synopsis-title">synopsis</h3>
                        <p className="details__synopsis">{overview} <span className="details__synopsis-span">read more</span></p>
                        <button className="details__button">book ticket</button>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
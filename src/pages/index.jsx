import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import Icons from "../utils/Icons";

import "../styles/pages/_home.scss";
import { fetchFromTMDB, getMovieWithImages, getCinemas } from "../utils/API.js";

export default function HomePage() {
  const [upcoming, setUpcoming] = useState([]);
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    async function loadUpcoming() {
      const cinemasData = await getCinemas();
      setCinemas(cinemasData);

      const data = await fetchFromTMDB("/movie/upcoming", {
        language: "en-US",
        page: 1,
      });

      if (data?.results) {
        const moviesWithBackdrops = await Promise.all(
          data.results.map(async (movie) => {
            const fullData = await getMovieWithImages(movie.id);
            const backdrop = fullData?.images?.backdrops?.[0]?.file_path;

            return {
              ...movie,
              backdrop: backdrop || movie.backdrop_path,
            };
          })
        );

        setUpcoming(moviesWithBackdrops);
      }
    }

    loadUpcoming();
  }, []);

  return (
    <>
      <header className='header'>
        <div className='header__top'>
          <div className='header__greeting'>
            <span className='header__welcome-text'>Welcome Back,</span>
            <strong className='header__username'>Inspired</strong>
          </div>
          <figure className='header__avatar'>
            <img src='/avatar.png' alt='User Avatar' />
          </figure>
        </div>

        <form className='header__search' role='search'>
          <Icons.search
            size={32}
            aria-label='Search'
            className='header__search-icon'
          />
          <input
            type='text'
            placeholder='Search your favourite movie'
            className='header__search-input'
            aria-label='Search Movies'
          />
        </form>
      </header>

      <Layout>
        <section className='coming-soon' aria-labelledby='coming-soon-heading'>
          <header className='coming-soon__header'>
            <h2 id='coming-soon-heading' className='coming-soon__title'>
              Coming Soon
            </h2>
          </header>
          <ul className='coming-soon__list'>
            {upcoming.map((movie) => (
              <li key={movie.id} className='coming-soon__item'>
                <article>
                  <Link to={`/details/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w780${movie.backdrop}`}
                      alt={`Backdrop from ${movie.title}`}
                    />
                    <h3 className='coming-soon__item-title'>{movie.title}</h3>
                    <p className='coming-soon__item-date'>
                      {movie.release_date}
                    </p>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section className='cinemas-near' aria-labelledby='cinema-heading'>
          <div className='cinemas-near__wrapper'>
            <header>
              <h2 id='cinema-heading' className='cinemas-near__title'>
                Cinemas Near You
              </h2>
            </header>

            <ul className='cinema-list'>
              {cinemas.map((cinema, i) => (
                <li key={i} className='cinema-card'>
                  <img
                    src={cinema.image}
                    alt={`${cinema.name} logo`}
                    className='cinema-card__image'
                  />
                  <div className='cinema-card__info'>
                    <a
                      href={cinema.website}
                      className='cinema-card__name'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {cinema.name}
                    </a>
                    <p className='cinema-card__address'>{cinema.adresse}</p>
                  </div>
                  <div
                    className='cinema-card__rating'
                    aria-label={`Rating: ${cinema.rating}`}
                  >
                    <Icons.star size={14} aria-hidden='true' />

                    <span>{cinema.rating}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Layout>
    </>
  );
}

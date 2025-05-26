import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Icons from "../utils/Icons";
import "../styles/pages/_home.scss";

const HomePage = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    async function fetchUpcomingMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=d53faa548947914998a2cd2461c8ae72`
        );
        const data = await response.json();
        setUpcomingMovies(data.results);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    }

    fetchUpcomingMovies();
  }, []);

  return (
    <Layout>
      <header className='header'>
        <div className='header__top'>
          <div className='header__greeting'>
            <span className='header__welcome-text'>Welcome Back,</span>
            <strong className='header__username'>Inspired</strong>
          </div>
          <div className='header__avatar'>
            <img src='/avatar.png' alt='User Avatar' />
          </div>
        </div>

        <div className='header__search'>
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
        </div>
      </header>

      <main className='main-content'>
        <section className='coming-soon'>
          <div className='coming-soon__header'>
            <h2 className='coming-soon__title'>Coming Soon</h2>
          </div>
          <div className='coming-soon__list'>
            {upcomingMovies.map((movie) => (
              <Link
                to={`/details/${movie.id}`}
                key={movie.id}
                className='coming-soon__item'
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3 className='coming-soon__item-title'>{movie.title}</h3>
                <p className='coming-soon__item-date'>{movie.release_date}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className='cinemas-near'>
          {/* Hardcode cinema data or fetch from external source later */}
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;

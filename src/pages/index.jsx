import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import Icons from "../utils/Icons";

import "../styles/pages/_home.scss";
import { fetchFromTMDB } from "../utils/API.js";

export default function HomePage() {
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    async function loadUpcoming() {
      const data = await fetchFromTMDB("/movie/upcoming", {
        language: "en-US",
        page: 1,
      });

      if (data?.results) setUpcoming(data.results);
    }

    loadUpcoming();
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
          <header className='coming-soon__header'>
            <h2 className='coming-soon__title'>Coming Soon</h2>
          </header>
          <div className='coming-soon__list'>
            <div className='coming-soon__items'>
              {upcoming.map((movie) => (
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
          </div>
        </section>

        <section className='cinemas-near'>
          {/* Hardcode cinema data or fetch from external source later */}
        </section>
      </main>
    </Layout>
  );
}

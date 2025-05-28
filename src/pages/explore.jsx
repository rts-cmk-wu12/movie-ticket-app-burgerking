import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/pages/_explore.scss";
import Layout from "../components/layout";
import Header from "../components/header";
import { fetchFromTMDB } from "../utils/API.js";

export default function Explore() {
  const [upcoming, setUpcoming] = useState([]);
  const [nowShowing, setNowShowing] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [category, setCategory] = useState("now_playing");

  useEffect(() => {
    async function loadMovies() {
      const upcomingData = await fetchFromTMDB("/movie/upcoming", {
        language: "en-US",
        page: 1,
      });

      const nowShowingData = await fetchFromTMDB("/movie/now_playing", {
        language: "en-US",
        page: 1,
      });

      const recommendedData = await fetchFromTMDB("/movie/popular", {
        language: "en-US",
        page: 1,
      });

      if (upcomingData?.results) setUpcoming(upcomingData.results);
      if (nowShowingData?.results) setNowShowing(nowShowingData.results);
      if (recommendedData?.results)
        setRecommendedMovies(recommendedData.results);
    }

    loadMovies();
  }, []);

  return (
    <>
      <Header heading={"explore movie"} search />

      <Layout>
        <section className='tabs-section'>
          <div className='tabs-wrapper'>
            <button
              className={`tabs-button ${
                category === "now_playing" ? "active_explore" : ""
              }`}
              onClick={() => setCategory("now_playing")}
            >
              now showing
            </button>
            <button
              className={`tabs-button ${
                category === "upcoming" ? "active_explore" : ""
              }`}
              onClick={() => setCategory("upcoming")}
            >
              upcoming
            </button>
          </div>
        </section>

        <section className='top-movies'>
          <div className='top-movies__header'>
            <h2 className='top-movies__title'>
              {category === "now_playing" ? "now showing" : "upcoming"}
            </h2>
            <p className='top-movies__text'>see more</p>
          </div>
          <div className='top-movies__list'>
            {(category === "now_playing" ? nowShowing : upcoming).map(
              (movie) => (
                <NavLink
                  to={`/details/${movie.id}`}
                  key={movie.id}
                  className='top-movies__item'
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h3 className='top-movies__item-title'>{movie.title}</h3>
                  <p className='top-movies__item-rating'>
                    ⭐ {Math.round(movie.vote_average)} / 10
                  </p>
                </NavLink>
              )
            )}
          </div>
        </section>

        <section className='recommended'>
          <div className='recommended__header'>
            <h2 className='recommended__title'>recommended</h2>
            <p className='recommended__text'>see more</p>
          </div>
          <div className='recommended__list'>
            {recommendedMovies.map((movie) => (
              <NavLink
                to={`/details/${movie.id}`}
                key={movie.id}
                className='recommended__item'
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3 className='recommended__item-title'>{movie.title}</h3>
              </NavLink>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}

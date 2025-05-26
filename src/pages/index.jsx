import Layout from "../components/Layout";
import Icons from "../utils/Icons";

const HomePage = () => (
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
      <section className='intro'>
        <h1 className='intro__title'>Welcome to the Movie Ticket App</h1>
        <p className='intro__description'>
          Book your favorite movie tickets easily!
        </p>
      </section>

      <section className='coming-soon'>
        {/* You’ll add the actual movie cards here */}
      </section>

      <section className='cinemas-near'>
        {/* You’ll add the cinema list here */}
      </section>
    </main>
  </Layout>
);

export default HomePage;

import Layout from "../components/layout";
 
export default function Explore() {
    return (
        <Layout>
            <div className="tabs">
                <button className="tabs__button-showing">now showing</button>
                <button className="tabs__button-upcoming">ppcoming</button>
            </div>
            <section className="top-movies">
                <h2 className="top-movies__title">Top Movies</h2>
                <div className="top-movies__list">
                    <div className="top-movies__item">
                        <img src="" alt="Movie Poster" />
                        <h3 className="top-movies__item-title">Movie Title</h3>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
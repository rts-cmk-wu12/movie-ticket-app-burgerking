import { IoIosArrowBack } from "react-icons/io";
import { CiBookmarkMinus } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import "../styles/components/_header.scss";
import { useNavigate } from "react-router";

export default function Header({ heading, bookmark = false, search = false, movieDetails }) {
    let navigate = useNavigate();

    const handleBookmarkClick = () => {
        if (bookmark && movieDetails) {
            const savedPlans = JSON.parse(localStorage.getItem("savedPlans")) || [];
            const newPlan = {
                title: movieDetails.title,
                genre: movieDetails.genres[0]?.name || "Unknown",
                runtime: `${Math.floor(movieDetails.runtime / 60)}h ${movieDetails.runtime % 60}m`,
            };
            localStorage.setItem("savedPlans", JSON.stringify([...savedPlans, newPlan]));
            alert("Movie saved to your plan!");
        }
    };

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__icon-container">
                    <IoIosArrowBack size={24} onClick={() => navigate(-1)} className="header__icon" />
                </div>
                <div className="header__title-container">
                    <h1 className="header__title">{heading}</h1>
                </div>
                <div className="header__actions">
                    {bookmark && (
                        <CiBookmarkMinus
                            size={24}
                            className="header__icon"
                            onClick={handleBookmarkClick}
                        />
                    )}
                    {search && <IoIosSearch size={24} className="header__icon" />}
                </div>
            </div>
        </header>
    );
}
import { IoIosArrowBack } from "react-icons/io";
import { CiBookmarkMinus } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import "../styles/components/_header.scss";
import { useNavigate } from "react-router";

export default function Header({ heading, bookmark = false, search = false }) {
    let navigate = useNavigate();
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
                    {bookmark ? <CiBookmarkMinus size={24} className="header__icon" /> : ""}
                    {search ? <IoIosSearch size={24} className="header__icon" /> : ""}
                </div>
            </div>
        </header>
    );
}
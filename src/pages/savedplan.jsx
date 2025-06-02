import Header from "../components/header";
import Layout from "../components/layout";
import { useEffect, useState } from "react";
import "../styles/pages/_savedplan.scss";

export default function SavedPlan() {
    const [savedPlans, setSavedPlans] = useState([]);
    const [date, setDate] = useState([]);
    const [time, setTime] = useState([]);
    const [people, setPeople] = useState(1); // State for number of people

    useEffect(() => {
        const plans = JSON.parse(localStorage.getItem("savedPlans")) || [];
        setSavedPlans(plans);
    }, []);

    return (
        <>
            <Header heading={"saved plan"} />
            <Layout>
                <section className="saved-plan">
                    <div className="saved-plan__container">
                        {savedPlans.length > 0 ? (
                            savedPlans.map((plan, index) => (
                                <div key={index} className="saved-plan__movie-wrapper">
                                    <h2 className="saved-plan__movie-number">{index + 1}.</h2>
                                    <div className="saved-plan__movie-details">
                                        <img src="public/avatar.png" alt="" />
                                        <div className="saved-plan__movie-info">
                                            <p className="saved-plan__movie-genre">{plan.genre}</p>
                                            <h3 className="saved-plan__movie-title">{plan.title}</h3>
                                            <p className="saved-plan__movie-runtime">{plan.runtime}</p>
                                        </div>
                                    </div>
                                    <h2 className="select-seats__title">cinema</h2>
                                    <select className="select-seats__cinema-select">
                                        <option>Empire XXI Yogyakarta</option>
                                        <option>Viva Cinema</option>
                                        <option>EbonyLife Cinema</option>
                                    </select>
                                    <div className="saved-plan__datetime">
                                        <div className="select-seats__datetime">
                                            <h3 className="select-seats__title">date</h3>
                                            <select
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                className="select-seats__date-select"
                                            >
                                                {Array.from({ length: 30 }, (_, i) => {
                                                    const futureDate = new Date();
                                                    futureDate.setDate(futureDate.getDate() + i);
                                                    const formattedDate = futureDate.toISOString().split("T")[0];
                                                    return (
                                                        <option key={i} value={formattedDate}>
                                                            {formattedDate}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <div className="select-seats__datetime">
                                            <h3 className="select-seats__title">time</h3>
                                            <select
                                                value={time}
                                                onChange={(e) => setTime(e.target.value)}
                                                className="select-seats__time-select"
                                            >
                                                {Array.from({ length: 24 }, (_, i) => {
                                                    const now = new Date();
                                                    const futureTime = new Date();
                                                    futureTime.setHours(now.getHours() + i, 0, 0, 0);
                                                    const formattedTime = futureTime
                                                        .toTimeString()
                                                        .split(" ")[0]
                                                        .slice(0, 5);
                                                    return (
                                                        <option key={i} value={formattedTime}>
                                                            {formattedTime}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                            <h3 className="select-seats__title">people</h3>
                                            <select
                                                value={people}
                                                onChange={(e) => setPeople(e.target.value)}
                                                className="select-seats__people-select"
                                            >
                                                {Array.from({ length: 10 }, (_, i) => (
                                                    <option key={i + 1} value={i + 1}>
                                                        {i + 1} {i + 1 === 1 ? "person" : "people"}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                </div>
                            ))
                        ) : (
                            <p className="saved-plan__empty">No saved plans yet.</p>
                        )}
                    </div>
                </section>
            </Layout>
        </>
    );
}
import React, { useState } from "react";
import "../styles/pages/_seats.scss";
import Layout from "../components/Layout";
import Header from "../components/header";
import { NavLink } from "react-router-dom";

const SelectSeats = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [date, setDate] = useState([]);
  const [time, setTime] = useState([]);

  const reservedSeats = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 2, 0],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
  ];

  const toggleSeat = (row, col) => {
    if (reservedSeats[row][col] === 1) return;

    const isSelected = selectedSeats.some(
      (seat) => seat.row === row && seat.col === col
    );
    if (isSelected) {
      setSelectedSeats((prev) =>
        prev.filter((s) => !(s.row === row && s.col === col))
      );
    } else {
      setSelectedSeats((prev) => [...prev, { row, col }]);
    }
  };

  const renderSeats = () =>
    reservedSeats.map((row, rowIndex) => (
      <div className='seat-row' key={rowIndex}>
        {row.map((seat, colIndex) => {
          const isSelected = selectedSeats.some(
            (s) => s.row === rowIndex && s.col === colIndex
          );
          const className =
            seat === 1
              ? "seat reserved"
              : isSelected
              ? "seat selected"
              : "seat available";

          return (
            <div
              key={colIndex}
              className={className}
              onClick={() => toggleSeat(rowIndex, colIndex)}
            />
          );
        })}
      </div>
    ));

  return (
    <>
      {/* Header-komponent med overskrift */}
      <Header heading={"select seats"} />

      <Layout>
        <div className="select-seats">
          <div className="cinema-info">
            {/* Dropdown til valg af biograf */}
            <div className="select-seats__cinema">
              <h2 className="select-seats__title">cinema</h2>
              <select className="select-seats__cinema-select">
                <option>Empire XXI Yogyakarta</option>
                <option>Viva Cinema</option>
                <option>EbonyLife Cinema</option>
              </select>
            </div>
            <div className="datetime">
              <div>
                {/* Dropdown til valg af dato */}
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
              <div>
                {/* Dropdown til valg af tid */}
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
          </div>
          {/* Biografskærm */}
          <div className="screen">
            <img src="/Screen.svg" alt="Cinema screen" />
          </div>
          {/* Sædeoversigt */}
          <div className="seats-container">{renderSeats()}</div>
          {/* Forklaring af sædefarver */}
          <div className="legend">
            <div className="legend-item">
              <span className="seat selected" /> Selected
            </div>
            <div className="legend-item">
              <span className="seat reserved" /> Reserved
            </div>
            <div className="legend-item">
              <span className="seat available" /> Available
            </div>
          </div>
          {/* Link til checkout */}
          <NavLink to="/checkout" className="checkout">
            Checkout
          </NavLink>
        </div>
      </Layout>
    </>
  );
};

export default SelectSeats;

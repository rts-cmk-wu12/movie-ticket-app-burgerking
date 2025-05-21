import React, { useState } from 'react';
import "../styles/pages/_seats.scss";

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
            setSelectedSeats((prev) => prev.filter((s) => !(s.row === row && s.col === col)));
        } else {
            setSelectedSeats((prev) => [...prev, { row, col }]);
        }
    };

    const renderSeats = () => (
        reservedSeats.map((row, rowIndex) => (
            <div className="seat-row" key={rowIndex}>
                {row.map((seat, colIndex) => {
                    const isSelected = selectedSeats.some(
                        (s) => s.row === rowIndex && s.col === colIndex
                    );
                    const className = seat === 1
                        ? 'seat reserved'
                        : isSelected
                            ? 'seat selected'
                            : 'seat available';

                    return (
                        <div
                            key={colIndex}
                            className={className}
                            onClick={() => toggleSeat(rowIndex, colIndex)}
                        />
                    );
                })}
            </div>
        ))
    );

    return (
        <div className="select-seats">
            <div className="cinema-info">
                <div className="select-seats__cinema">
                    <h2 className="select-seats__title">cinema</h2>
                    <select className="select-seats__cinema-select">
                        <option>Empire XXI Yogyakarta</option>
                    </select>
                </div>
                <div className="datetime">
                    <div>
                    <h3 className="select-seats__title">date</h3>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    </div>
                    <div>
                    <h3 className="select-seats__title">time</h3>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    </div>
                </div>
            </div>
            <div className="screen" />
            <div className="seats-container">{renderSeats()}</div>
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
            <button className="checkout">Checkout</button>
        </div>
    );
};

export default SelectSeats;

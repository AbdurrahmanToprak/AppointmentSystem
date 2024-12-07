import React from "react";
import "./PsychologistLayout.css";

const Randevular = () => {
    const randevular = [
        { id: 1, date: "2024-12-10", patient: "John Doe", time: "10:00 AM" },
        { id: 2, date: "2024-12-11", patient: "Jane Smith", time: "2:00 PM" },
        // Diğer randevular
    ];

    return (
        <div className="table-container">
            <h2>Randevular</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tarih</th>
                        <th>Hasta</th>
                        <th>Saat</th>
                    </tr>
                </thead>
                <tbody>
                    {randevular.map((randevu) => (
                        <tr key={randevu.id}>
                            <td>{randevu.id}</td>
                            <td>{randevu.date}</td>
                            <td>{randevu.patient}</td>
                            <td>{randevu.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Randevular;
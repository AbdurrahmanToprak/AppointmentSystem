import React from "react";
import "./PsychologistLayout.css";

const Feedbacks = () => {
    const feedbacks = [
        { id: 1, patient: "John Doe", feedback: "Great session!" },
        { id: 2, patient: "Jane Smith", feedback: "Helpful advice." },
        // Diðer geri bildirimler
    ];

    return (
        <div className="table-container">
            <h2>Feedbacks</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hasta</th>
                        <th>Yorum</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map((feedback) => (
                        <tr key={feedback.id}>
                            <td>{feedback.id}</td>
                            <td>{feedback.patient}</td>
                            <td>{feedback.feedback}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Feedbacks;
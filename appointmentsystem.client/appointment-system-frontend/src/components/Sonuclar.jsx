import React from "react";
import "./PsychologistLayout.css";

const Sonuclar = () => {
    const results = [
        { id: 1, patient: "John Doe", result: "Positive" },
        { id: 2, patient: "Jane Smith", result: "Negative" },
        // Diðer hastalarýn sonuçlarý
    ];

    return (
        <div className="table-container">
            <h2>Hastalarýn Sonuçlarý</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hasta</th>
                        <th>Sonuç</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result) => (
                        <tr key={result.id}>
                            <td>{result.id}</td>
                            <td>{result.patient}</td>
                            <td>{result.result}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Sonuclar;
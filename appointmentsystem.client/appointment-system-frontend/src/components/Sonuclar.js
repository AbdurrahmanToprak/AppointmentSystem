import React from "react";
import "./PsychologistLayout.css";

const Sonuclar = () => {
    const results = [
        { id: 1, patient: "John Doe", result: "Positive" },
        { id: 2, patient: "Jane Smith", result: "Negative" },
        // Di�er hastalar�n sonu�lar�
    ];

    return (
        <div className="table-container">
            <h2>Hastalar�n Sonu�lar�</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hasta</th>
                        <th>Sonu�</th>
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
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PsychologistLayout.css";

const token = localStorage.getItem("token");

const apiClient = axios.create({
    headers: {
        Authorization: `Bearer ${token}`
    }
});

const Sonuclar = () => {
    const [results, setResults] = useState([]); // results olarak deðiþtirdik
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get("https://localhost:7200/api/Doctor/results");
                setResults(response.data); // setResults kullandýk
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message || "Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                        <tr key={result.patientId}>
                            <td>{result.patientId}</td>
                            <td>{result.patientName}</td>
                            <td>{result.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Sonuclar;

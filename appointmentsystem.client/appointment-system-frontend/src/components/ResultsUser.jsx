import React, { useState, useEffect } from "react";
import axios from "axios";

const token = localStorage.getItem("token");

const apiClient = axios.create({
    headers: {
        Authorization: `Bearer ${token}`
    }
});

const ResultsUser = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get("https://localhost:7200/api/patient/result/myresults");
                setResults(response.data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message || "Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Sonuçlarým</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : results.length > 0 ? (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Hasta ID</th>
                            <th>Tarih</th>
                            <th>Sonuç</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result) => (
                            <tr key={result.resultId}>
                                <td>{result.resultId}</td>
                                <td>{new Date(result.createdDate).toLocaleDateString()}</td> 
                                <td>{result.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Henüz bir sonuç kaydýnýz bulunmamaktadýr.</p>
            )}
        </div>
    );
};

export default ResultsUser;
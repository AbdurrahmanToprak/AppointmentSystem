import React, { useState, useEffect } from "react";

const ResultsUser = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        // API'den sonuç verilerini al
        fetch("/api/results/user")
            .then((response) => response.json())
            .then((data) => setResults(data))
            .catch((error) => console.error("Error fetching results:", error));
    }, []);

    return (
        <div>
            <h2>Sonuçlarým</h2>
            {results.length > 0 ? (
                <ul>
                    {results.map((result) => (
                        <li key={result.id}>
                            {result.date}: {result.details}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Henüz bir sonuç kaydýnýz bulunmamaktadýr.</p>
            )}
        </div>
    );
};

export default ResultsUser;
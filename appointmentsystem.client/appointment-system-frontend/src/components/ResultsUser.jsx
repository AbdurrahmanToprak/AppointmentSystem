import React, { useState, useEffect } from "react";

const ResultsUser = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        // API'den sonu� verilerini al
        fetch("/api/results/user")
            .then((response) => response.json())
            .then((data) => setResults(data))
            .catch((error) => console.error("Error fetching results:", error));
    }, []);

    return (
        <div>
            <h2>Sonu�lar�m</h2>
            {results.length > 0 ? (
                <ul>
                    {results.map((result) => (
                        <li key={result.id}>
                            {result.date}: {result.details}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Hen�z bir sonu� kayd�n�z bulunmamaktad�r.</p>
            )}
        </div>
    );
};

export default ResultsUser;
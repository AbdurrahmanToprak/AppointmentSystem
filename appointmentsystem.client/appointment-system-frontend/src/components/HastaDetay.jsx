import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Hastalar.css";

const token = localStorage.getItem("token");

const apiClient = axios.create({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

const HastaDetay = () => {
    const { id } = useParams(); 
    const [hasta, setHasta] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const response = await apiClient.get(`https://localhost:7200/api/admin/user/patients/${id}`);
                setHasta(response.data);
            } catch (error) {
                console.error("Hata:", error.response?.data?.message || "Bir hata olu�tu.");
            } finally {
                setLoading(false);
            }
        };

        fetchPatientDetails();
    }, [id]);

    if (loading) return <p>Y�kleniyor...</p>;
    if (!hasta) return <p>Hasta bulunamad�.</p>;

    return (
        <div>
            <h1>Hasta Detaylar�</h1>
            <p>Ad: {`${hasta.name} ${hasta.surname}`}</p>
            <p>Email: {hasta.email || "Belirtilmemi�"}</p>
        </div>
    );
};

export default HastaDetay;

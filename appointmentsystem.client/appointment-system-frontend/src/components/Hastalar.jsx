import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Detay sayfasý yönlendirme için
import "./Hastalar.css";

const token = localStorage.getItem("token");

const apiClient = axios.create({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

const Hastalar = () => {
    const [hastalar, setHastalar] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate(); 


    const fetchPatients = async () => {
        try {
            const response = await apiClient.get("https://localhost:7200/api/admin/user/patients");
            setHastalar(response.data);
        } catch (error) {
            console.error("Hata:", error.response?.data?.message || "Bir hata oluþtu.");
        } finally {
            setLoading(false);
        }
    };

    // Hasta silme fonksiyonu
    const deletePatient = async (id) => {
        if (!window.confirm("Bu hastayý silmek istediðinize emin misiniz?")) return;

        try {
            await apiClient.delete(`https://localhost:7200/api/admin/user/patients/${id}`);
            setHastalar(hastalar.filter((hasta) => hasta.userId !== id)); 
            alert("Hasta baþarýyla silindi.");
        } catch (error) {
            console.error("Hata:", error.response?.data?.message || "Bir hata oluþtu.");
        }
    };

  
    const viewDetails = (id) => {
        navigate(`${id}`); 
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    return (
        <div className="hastalar">
            <h1>Hasta Listesi</h1>
            {loading ? (
                <p>Yükleniyor...</p>
            ) : (
                    <table className="patient-table">
                    <thead>
                        <tr>
                            <th>Ad</th>
                            <th>E-mail</th>
                            <th>Ýþlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hastalar.length > 0 ? (
                            hastalar.map((hasta) => (
                                <tr key={hasta.userId}>
                                    <td>{`${hasta.name} ${hasta.surname}`}</td>
                                    <td>{hasta.email || "Belirtilmemiþ"}</td>
                                    <td>
                                        <button
                                            className="action-btn detail-btn"
                                            onClick={() => viewDetails(hasta.userId)}
                                        >
                                            Detaylar
                                        </button>
                                        <button
                                            className="action-btn delete-btn"
                                            onClick={() => deletePatient(hasta.userId)}
                                        >
                                            Sil
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">Hiç hasta bulunamadý.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Hastalar;

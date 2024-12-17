import React, { useState, useEffect } from "react";

const PatientList = () => {
    const [patients, setPatients] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleDetails = (patient) => {
        setSelectedPatient(patient); 
    };
    const closeModal = () => {
        setSelectedPatient(null);
    };

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch("https://localhost:7200/api/doctor/Patient"); 
                if (!response.ok) {
                    throw new Error("Veri alýnýrken bir hata olustu");
                }
                const data = await response.json();
                setPatients(data); 
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };
       

        fetchPatients();
    }, []); 

    if (loading) return <p>Yukleniyor...</p>;
    if (error) return <p>Hata: {error}</p>;
    return (
        <div>
            <h1>Hastalar Listesi</h1>
            <table border="1" style={{ width: "100%", textAlign: "left" }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Adý</th>
                        <th>Hasta bilgileri</th>

                    </tr>
                </thead>
                <tbody>
                    {patients.length > 0 ? (
                        patients.map((patient, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{patient.name} {patient.surname}</td>
                                <td>
                                    <button onClick={() => handleDetails(patient)}>Detay Gor</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Hic hasta bulunmamaktadýr.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* Modal */}
            {selectedPatient && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h2>Hasta Detaylarý</h2>
                        <p><strong>Adý:</strong> {selectedPatient.name}</p>
                        <p><strong>Soyadý:</strong> {selectedPatient.surname}</p>
                        <p><strong>Mail:</strong> {selectedPatient.email}</p>
                        <p>
                            {selectedPatient.imageUrl && (
                                <img
                                    src={selectedPatient.imageUrl ? selectedPatient.imageUrl : "default-image-url"}
                                    alt="Patient"
                                    className="profile-image"
                                    style={{ width: '100px' }}
                                />

                            )}
                        </p>
                        <button onClick={closeModal}>Kapat</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        width: '300px',
        textAlign: 'center',
    }
};

export default PatientList;

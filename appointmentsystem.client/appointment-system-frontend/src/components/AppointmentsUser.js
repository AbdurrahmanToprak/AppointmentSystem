import React, { useState, useEffect } from "react";

const AppointmentsUser = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        // API'den randevu verilerini al
        fetch("/api/appointments/user")
            .then((response) => response.json())
            .then((data) => setAppointments(data))
            .catch((error) => console.error("Error fetching appointments:", error));
    }, []);

    return (
        <div>
            <h2>Randevular�m</h2>
            {appointments.length > 0 ? (
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment.id}>
                            {appointment.date} - {appointment.psychologistName}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Hen�z bir randevunuz yok.</p>
            )}
        </div>
    );
};

export default AppointmentsUser;    
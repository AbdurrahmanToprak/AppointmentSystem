import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios'u import ettik
import "./RegisterForm.css"; // CSS dosyas�

const API_URL = "https://localhost:7200/api/Auth"; // API URL'si

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const registerRequest = {
            name: formData.name,
            surname: formData.surname,
            email: formData.email,
            password: formData.password,
        };

        try {
            const response = await axios.post(`${API_URL}/register`, registerRequest, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            // Ba�ar�l� yan�t ald���m�zda yap�lacak i�lemler
            if (response.status === 200) {
                setMessage("Kay�t ba�ar�l�! Giri� yapmak i�in y�nlendiriliyorsunuz.");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setMessage(response.data.message || "Kay�t s�ras�nda bir hata olu�tu.");
            }
        } catch (error) {
            console.error("Register Error:", error);
            setMessage(error.response?.data?.message || "Bir hata olu�tu. L�tfen tekrar deneyin.");
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleRegister}>
                <h2>Register</h2>

                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Surname:</label>
                    <input
                        type="text"
                        value={formData.surname}
                        onChange={(e) =>
                            setFormData({ ...formData, surname: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
                <p onClick={() => navigate("/login")} className="login-link">
                    Already have an account? Login here
                </p>
            </form>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default RegisterForm;

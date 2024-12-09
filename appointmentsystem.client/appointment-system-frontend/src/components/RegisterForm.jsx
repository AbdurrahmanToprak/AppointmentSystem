import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css"; // CSS dosyasý

const API_URL = "https://localhost:7200/api/Auth"; // API URL'si

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        
        name: "",
        surname: "",  // Soyad eklendi
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const registerRequest = {
            name: formData.name,
            surname: formData.surname,  // Soyad ekleniyor
            email: formData.email,
            password: formData.password,
        };

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerRequest),
            });

            // Yanýtýn JSON olup olmadýðýný kontrol et
            let responseData;
            try {
                responseData = await response.json();
            } catch (error) {
                responseData = await response.text();  // JSON deðilse ham metni al
                console.error("Non-JSON response:", responseData);
            }

            if (response.ok) {
                setMessage("Kayýt baþarýlý! Giriþ yapmak için yönlendiriliyorsunuz.");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setMessage(responseData.message || "Kayýt sýrasýnda bir hata oluþtu.");
            }
        } catch (error) {
            console.error("Register Error:", error);
            setMessage("Bir hata oluþtu. Lütfen tekrar deneyin.");
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
                    <label>Surname:</label> {/* Soyad alaný eklendi */}
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
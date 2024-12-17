import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const API_URL = "https://localhost:7200/api/Auth"; // API URL'si

const LoginForm = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginRequest = {
            email,
            password,
        };

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginRequest),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);

                // Token'ý ayrýþtýralým
                const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
                const roleId = decodedToken.role;

                const redirectTo = localStorage.getItem("redirectTo") || "/user"; 
                if (redirectTo && redirectTo !== "/user") {
                    navigate(redirectTo);
                    localStorage.removeItem("redirectTo"); // Yönlendirme tamamlandýktan sonra temizle
                } else {
                    if (roleId === "1") {
                        navigate("/admin/dashboard");
                    } else if (roleId === "2") {
                        navigate("/psychologist");
                    } else if (roleId === "3") {
                        navigate("/user");
                    }
                }

                setMessage("Giriþ baþarýlý!");
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || "Gecersiz kullanýcý adý veya sifre.");
            }
        } catch (error) {
            console.error("Login Error:", error);
            setMessage("Bir hata olustu. Lutfen tekrar deneyin.");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const registerRequest = {
            name,
            surname,
            email,
            password,
        };

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerRequest),
            });

            if (response.ok) {
                setMessage("Kayýt baþarýlý! Giris yapmak icin týklayýn.");
                setIsRegistering(false);
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || "Kayýt sýrasýnda bir hata olustu.");
            }
        } catch (error) {
            console.error("Register Error:", error);
            setMessage("Bir hata olustu. Lutfen tekrar deneyin.");
        }
    };

    return (
        <div className="login-container">
            <div className="info-panel">
                <h2>{isRegistering ? "Tekrardan Hosgeldiniz!" : "Simdi giris yap!"}</h2>
                <p>
                    {isRegistering
                        ? "Zaten bir hesabiniz var mi? Giris yapmak icin tiklayin."
                        : "Hesabiniz yok mu? Simdi kayit ol!"}
                </p>
                <button onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? "Login" : "Register"}
                </button>
            </div>

            <div className="form-panel">
                <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                    <h2>{isRegistering ? "Kayit" : "Giris"}</h2>

                    {isRegistering && (
                        <>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Ýsminizi Giriniz"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Soy Ýsminizi Giriniz"
                                    required
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    placeholder="Mailinizi Giriniz"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    {!isRegistering && (
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Mailinizi Giriniz"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="sifrenizi Giriniz"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit">
                        {isRegistering ? "Register" : "Login"}
                    </button>
                </form>
            </div>

            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default LoginForm;
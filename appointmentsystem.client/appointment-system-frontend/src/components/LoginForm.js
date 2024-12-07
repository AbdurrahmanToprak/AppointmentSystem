import React, { useState } from "react";
import "./LoginForm.css";

const LoginForm = () => {
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login Submitted");
    };

    const handleRegister = (e) => {
        e.preventDefault();
        console.log("Register Submitted");
    };

    return (
        <div className="login-container">
            {/* Bilgi Paneli */}
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

            {/* Form Paneli */}
            <div className="form-panel">
                <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                    <h2>{isRegistering ? "Kayit" : "Giris"}</h2>

                    {/* Register modundaki inputlar */}
                    {isRegistering && (
                        <>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="isminizi Giriniz"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Soy isminizi Giriniz"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    placeholder="Mailinizi Giriniz"
                                    required
                                />
                            </div>
                        </>
                    )}

                    {/* Hem Login hem Register modunda ortak olan inputlar */}
                    {!isRegistering && (
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Mailinizi Giriniz"
                                required
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="sifrenizi Giriniz"
                            required
                        />
                    </div>

                    <button type="submit">
                        {isRegistering ? "Register" : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;

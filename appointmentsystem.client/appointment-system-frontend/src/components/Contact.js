import React from "react";
import "./Contact.css";

const Contact = () => {
    return (
        <div className="contact">
            <h1>Bize Ulaþýn</h1>
            <form className="contact-form">
                <input type="text" placeholder="Ad Soyad" required />
                <input type="email" placeholder="Email" required />
                <textarea placeholder="Mesajýnýz" rows="5" required></textarea>
                <button type="submit">Gönder</button>
            </form>
        </div>
    );
};

export default Contact;
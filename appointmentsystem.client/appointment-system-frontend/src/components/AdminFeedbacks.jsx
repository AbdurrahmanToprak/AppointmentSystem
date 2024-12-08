import React from "react";
import "./Feedback.css";

const Feedback = () => {
    return (
        <div className="feedback">
            <h1>Geri Bildirimler</h1>
            <ul className="feedback-list">
                <li>
                    <p>"Hizmet harika, te�ekk�rler!" - Mehmet Kaya</p>
                </li>
                <li>
                    <p>"Daha fazla uzman eklenirse daha iyi olur." - Ayla Demir</p>
                </li>
            </ul>
        </div>
    );
};

export default Feedback;
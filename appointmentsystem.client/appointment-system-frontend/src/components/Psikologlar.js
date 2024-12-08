import React from "react";
import "./Psikologlar.css";

const Psikologlar = () => {
    return (
        <div className="psikologlar">
            <h1>Psikolog Listesi</h1>
            <table className="psikolog-table">
                <thead>
                    <tr>
                        <th>Ad</th>
                        <th>Uzmanlýk</th>
                        <th>Ýþlem</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Dr. Ahmet Yýlmaz</td>
                        <td>Klinik Psikolog</td>
                        <td>
                            <button className="action-btn edit-btn">Düzenle</button>
                            <button className="action-btn delete-btn">Sil</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Dr. Ayþe Kaya</td>
                        <td>Çocuk Psikoloðu</td>
                        <td>
                            <button className="action-btn edit-btn">Düzenle</button>
                            <button className="action-btn delete-btn">Sil</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Psikologlar;
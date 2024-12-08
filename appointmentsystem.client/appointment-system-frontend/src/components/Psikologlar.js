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
                        <th>Uzmanl�k</th>
                        <th>��lem</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Dr. Ahmet Y�lmaz</td>
                        <td>Klinik Psikolog</td>
                        <td>
                            <button className="action-btn edit-btn">D�zenle</button>
                            <button className="action-btn delete-btn">Sil</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Dr. Ay�e Kaya</td>
                        <td>�ocuk Psikolo�u</td>
                        <td>
                            <button className="action-btn edit-btn">D�zenle</button>
                            <button className="action-btn delete-btn">Sil</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Psikologlar;
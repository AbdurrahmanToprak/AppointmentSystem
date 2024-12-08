import React from "react";
import "./Hastalar.css";

const Hastalar = () => {
    return (
        <div className="hastalar">
            <h1>Hasta Listesi</h1>
            <table className="patient-table">
                <thead>
                    <tr>
                        <th>Ad Soyad</th>
                        <th>Yaþ</th>
                        <th>Telefon</th>
                        <th>Ýþlemler</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ali Demir</td>
                        <td>30</td>
                        <td>555-123-4567</td>
                        <td>
                            <button className="btn view-btn">Görüntüle</button>
                            <button className="btn delete-btn">Sil</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Ayþe Yýlmaz</td>
                        <td>27</td>
                        <td>555-765-4321</td>
                        <td>
                            <button className="btn view-btn">Görüntüle</button>
                            <button className="btn delete-btn">Sil</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Hastalar;
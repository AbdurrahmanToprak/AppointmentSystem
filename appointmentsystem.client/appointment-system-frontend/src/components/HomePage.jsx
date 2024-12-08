import React, { useState, useEffect } from "react";
import axios from "axios"; // Directly import axios
import "./HomePage.css";

const HomePage = () => {
    const [about, setAbout] = useState(null);
    const [services, setServices] = useState([]);
    const [team, setTeam] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [contact, setContact] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data for all sections
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("-------------------------------------------");
                const aboutResponse = await axios.get("https://localhost:7200/api/Home/about");
               // const servicesResponse = await axios.get("https://localhost:7200/api/Home/services");
               // const teamResponse = await axios.get("https://localhost:7200/api/Home/team");
                const blogsResponse = await axios.get("https://localhost:7200/api/Home/blogs");
                const contactResponse = await axios.get("https://localhost:7200/api/Home/contact");

                setAbout(aboutResponse.data);
               // setServices(servicesResponse.data);
                //setTeam(teamResponse.data);
                setBlogs(blogsResponse.data);
                setContact(contactResponse.data);

                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err); // Log the error
                setError("Error fetching data");
                setLoading(false);
            }
        };

        fetchData(); // Fetch data when component mounts
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="homepage">
            {/* Header */}
            <header className="homepage-header">
                <div className="logo">Psikosağlık</div>
                <nav>
                    <ul>
                        <li><a href="#hero">Ana Sayfa</a></li>
                        <li><a href="#about">Hakkımızda</a></li>
                        <li><a href="#services">Hizmetler</a></li>
                        <li><a href="#team">Ekibimiz</a></li>
                        <li><a href="#blogs">Blog</a></li>
                        <li><a href="#contact">İletişim</a></li>
                        <li><a href="/login">GİRİS</a></li>
                    </ul>
                </nav>
            </header>

            {/* About Section */}
            <section id="about" className="about-section">
                <div className="about-wrapper">
                    <div className="about-text">
                        <h2>Hakkımızda</h2>
                        <p>{about ? about.content : "Yükleniyor..."}</p>
                        <div className="about-action">
                            <button className="cta-button">Daha Fazla</button>
                        </div>
                    </div>
                    <div className="about-image-container">
                        <div className="image-wrapper">
                            <img
                                src={about ? about.imageUrl : "https://via.placeholder.com/300"}
                                alt="About Us"
                                className="about-image"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            {/*<section id="services" className="services-section">*/}
            {/*    <h2>Hizmetler</h2>*/}
            {/*    <div className="services-list">*/}
            {/*        {services.map((service, index) => (*/}
            {/*            <div key={index} className="service-item">*/}
            {/*                <h3>{service.name}</h3>*/}
            {/*                <p>{service.description}</p>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/* Team Section */}
            {/*<section id="team" className="team-section">*/}
            {/*    <h2>Ekibimiz</h2>*/}
            {/*    <div className="team-list">*/}
            {/*        {team.map((member, index) => (*/}
            {/*            <div key={index} className="team-member">*/}
            {/*                <h3>{member.name}</h3>*/}
            {/*                <p>{member.position}</p>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/* Blog Section */}
            <section id="blogs" className="blogs-section">
                <h2>Blog</h2>
                <div className="blog-list">
                    {blogs.map((blog, index) => (
                        <div key={index} className="blog-item">
                            <h3>{blog.title}</h3>
                            <p>{blog.content}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact-section">
                <h2>İletişim</h2>
                {contact ? (
                    <div className="contact-info">
                        <p>Email: {contact.email}</p>
                        <p>Phone: {contact.phoneNumber}</p>
                        <p>Address: {contact.address}</p>
                    </div>
                ) : (
                    <p>Yükleniyor...</p>
                )}
            </section>

        </div>
    );
};

export default HomePage;

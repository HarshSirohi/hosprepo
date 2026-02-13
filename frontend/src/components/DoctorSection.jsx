import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorSection = ({ selectedDepartment }) => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:8000/api/v1/user/doctors",
                    { withCredentials: true }
                );
                setDoctors(data.doctors);
            } catch (error) {
                console.log("Error fetching doctors", error);
            }
        };
        fetchDoctors();
    }, []);

    useEffect(() => {
        if (selectedDepartment) {
            setFilteredDoctors(
                doctors.filter((doc) => doc.doctorDepartment === selectedDepartment)
            );
        } else {
            setFilteredDoctors([]);
        }
    }, [selectedDepartment, doctors]);

    if (!selectedDepartment) return null;

    return (
        <div className="container doctors-section" style={{ marginTop: "40px", paddingBottom: "60px" }}>
            <h2 style={{ marginBottom: "30px", color: "gray" }}>
                Doctors in {selectedDepartment}
            </h2>
            {filteredDoctors.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "30px" }}>
                    {filteredDoctors.map((doc) => (
                        <div key={doc._id} className="doctor-card" style={{
                            background: "var(--white)",
                            borderRadius: "15px",
                            padding: "20px",
                            textAlign: "center",
                            boxShadow: "var(--shadow-md)",
                            transition: "var(--transition-fast)"
                        }}>
                            <img
                                src={doc.docAvatar && doc.docAvatar.url}
                                alt={doc.firstName}
                                style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover", marginBottom: "15px", border: "4px solid var(--primary-color)" }}
                            />
                            <h4 style={{ color: "var(--text-dark)", marginBottom: "5px" }}>{doc.firstName} {doc.lastName}</h4>
                            <p style={{ fontSize: "16px", color: "var(--primary-color)", fontWeight: "bold" }}>{doc.doctorDepartment}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No doctors found for this department.</p>
            )}
        </div>
    );
};

export default DoctorSection;

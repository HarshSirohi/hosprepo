import React, { useState } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";
import DoctorSection from "../components/DoctorSection";

const Home = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleDepartmentClick = (deptName) => {
    setSelectedDepartment(deptName);
    // Smooth scroll to doctor section
    setTimeout(() => {
      const section = document.querySelector(".doctors-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <Hero
        title={
          "Welcome to MediSphere Medical Platform | Your Trusted Healthcare Provider"
        }
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/about.png"} />
      <Departments onDepartmentClick={handleDepartmentClick} />
      <DoctorSection selectedDepartment={selectedDepartment} />
      <MessageForm />
    </>
  );
};


export default Home;

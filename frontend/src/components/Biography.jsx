import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Our Legacy</p>
          <h3>Advancing Healthcare Excellence</h3>
          <p>
            MediSphere Medical Platform stands at the forefront of modern healthcare,
            combining compassionate patient care with groundbreaking medical innovation.
            Established with a vision to make world-class medical services accessible to all,
            we have grown into a leading institution recognized for our clinical excellence
            and patient-centric approach.
          </p>
          <p>Serving our community since 2010!</p>
          <p>Specializing in Comprehensive Medical Solutions.</p>
          <p>
            Our team of expert physicians, skilled nurses, and dedicated support staff
            work together in a highly synchronized environment. Leveraging the latest
            medical technologies, including our state-of-the-art MERN-stack integrated
            management system, we ensure that every patient receives personalized
            and efficient treatment tailored to their unique needs.
          </p>
          <p>Your Health, Our Priority.</p>
          <p>Excellence in Every Interaction.</p>
        </div>
      </div>
    </>
  );
};

export default Biography;

import React from "react";
import intro from "./Assets/intro.png";
import "./IntroSection.css";

function IntroSection() {
  return (
    <div className="intro-section" id="about">
      <div className="intro-section-left">
        <h1>
          25+ Years of{" "}
          <span>
            <u style={{ color: "rgb(255, 149, 0)" }}>Experience</u>
          </span>
        </h1>
      </div>
      <div className="intro-section-p">
        <p>
          With over 25 years of experience in the furniture industry, we’ve
          built a reputation for quality, craftsmanship, and customer
          satisfaction. Our deep expertise ensures that every piece is
          thoughtfully designed and made to last. Trust us to bring timeless
          style and reliable comfort into your home..
        </p>
      </div>
      <div className="intro-section-image">
        <img src={intro} alt="intro-img" />
      </div>
    </div>
  );
}

export default IntroSection;

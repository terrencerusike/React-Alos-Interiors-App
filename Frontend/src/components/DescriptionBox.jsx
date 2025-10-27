import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Our skilled artisans, some of whom have been with us for decades,
          employ time-honored techniques alongside modern innovations. This
          means paying close attention to details like precision joinery that
          stands the test of time, hand-finishing that brings out the natural
          beauty of the wood, and robust construction methods that guarantee
          stability and resilience for years to come.
        </p>
        <p>
          The result is more than just furniture; it's an investment. Pieces
          designed not only to bring timeless style and reliable comfort into
          your home today but to become cherished parts of your life for
          generations. We pride ourselves on creating furniture that's built to
          be enjoyed, lived on, and admired for its enduring quality and the
          exceptional craftsmanship behind every single piece.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;

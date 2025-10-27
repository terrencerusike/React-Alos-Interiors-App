import React from "react";
import SecondNav from "../components/SecondNavbar";
import Footer from "../components/Footer";
import LoginSignupform from "../components/SignUpForm";

function LoginSignup() {
  return (
    <div>
      <SecondNav/>
      <LoginSignupform />
      <Footer />
    </div>
  );
}

export default LoginSignup;

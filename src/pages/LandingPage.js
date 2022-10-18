import React from "react";
import "./LandingPage.css";
import { HiOutlineHome } from "react-icons/hi";
import AnimatedDiv from "../components/AnimatedDiv";

const LandingPage = () => {
  

  return (
    <div className='landing-wrapper'>
      <AnimatedDiv 
        title={"Welcome!"} 
        subtitle={"Scroll down to see more"} 
        />
      <AnimatedDiv
        title={"New user?"}
        bText={"Sign in here"}
        subtitle={"Otherwise,"}
        pText={"Continue as Guest\n or click on the "}
        icon={<HiOutlineHome />}
        textAfterIcon={" icon."}
      />
    </div>
  );
};

export default LandingPage;

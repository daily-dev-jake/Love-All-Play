import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import "../pages/LandingPage.css";

const AnimatedDiv = ({ title, subtitle, bText, pText, icon, textAfterIcon }) => {
    let navigate = useNavigate();
  const divVariant = {
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, scale: 0, x: 200 },
  };
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <motion.div
      ref={ref}
      variants={divVariant}
      animate={control}
      initial='hidden'
      className='anim-wrapper'>
      <p className="title">{title}</p>
      {bText ? <button className="button-signin" onClick={() => navigate("/app/user")}>{bText}</button> : <></>}
      {subtitle ? <p className="subtitle">{subtitle}</p> : <></>}
      <Link to={"/app/gamepage"}>{pText}{icon}{textAfterIcon}</Link>
    </motion.div>
  );
};

export default AnimatedDiv;

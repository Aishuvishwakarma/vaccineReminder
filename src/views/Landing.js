import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/auth/sign-in/");
  }, []);
  return <div></div>;
}

export default Landing;

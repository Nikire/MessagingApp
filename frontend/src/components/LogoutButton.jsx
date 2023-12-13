import React from "react";
import { cleanCookie } from "../utils";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();
  function handleClick(){
    cleanCookie("sessionToken");
    navigate("/login");
  }
  return (
    <button onClick={handleClick} className="btn btn-dark logout">
      <span><i className="bi bi-box-arrow-left"></i> Logout</span> 
    </button>
  );
}

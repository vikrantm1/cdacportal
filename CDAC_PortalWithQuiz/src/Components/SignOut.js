import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignOut() {
  const navigate = useNavigate();
  const signOut = () => {
    sessionStorage.setItem("user", null);
    localStorage.setItem("user", null);
    navigate("/");
  };
  return
}

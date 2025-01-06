import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modals/Modal";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";



const Login = () => {
  const { modal } = useGlobalContext();
  const navigate = useNavigate();
  return (
    <Modal
      header="Login"
      buttonText="Login"
      isRegister={false}
      onClose={() => {
        modal.closeModal(); // Close modal
        navigate("/"); // Navigate to home or desired route
      }}
    />
  );
};
export default Login;

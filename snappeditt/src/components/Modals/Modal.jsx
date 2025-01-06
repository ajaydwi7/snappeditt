import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./Modal.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import ClipLoader from "react-spinners/ClipLoader";

const Modal = ({ header, buttonText, isRegister, onClose }) => {
  const { auth, modal } = useGlobalContext();
  const [loading, setLoading] = useState(false);

  // Prevent modal display if user is already logged in
  useEffect(() => {
    if (auth.state.user) {
      toast.info("User already logged in");
      if (onClose) onClose(); // Close modal if the user is already logged in
    }
  }, [auth.state.user, onClose]);

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleSwitch = () => {
    modal.openModal(!isRegister);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Validation
    if (Object.values(data).some((value) => value === "")) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }
    if (isRegister && data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    // Register or login
    try {
      if (isRegister) {
        await auth.register(data);
      } else {
        await auth.login(data);
      }
      modal.closeModal();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return !auth.state.user ? ( // Render only if user is not logged in
    <div className="modal-container">
      <div className="modal">
        <div className="modal-cancel">
          <button className="modal-cancel-button" onClick={handleClose}>
            X
          </button>
        </div>
        <div className="modal-header">
          <h3>{header}</h3>
        </div>
        <div className="modal-body">
          <form onSubmit={submitForm}>
            {isRegister && (
              <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" name="username" />
              </div>
            )}
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" name="email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" name="password" />
            </div>
            {isRegister && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                />
              </div>
            )}
            <div className="login-or-register">
              {isRegister ? (
                <span>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={handleSwitch}
                    className="text-primaryRed"
                  >
                    Login
                  </button>
                </span>
              ) : (
                <span>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={handleSwitch}
                    className="text-primaryRed"
                  >
                    Register
                  </button>
                </span>
              )}
            </div>
            <div className="form-group">
              <button type="submit" className="btn-rounded btn-submit">
                {buttonText}{" "}
                <ClipLoader loading={loading} size={10} aria-label="Loading" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;

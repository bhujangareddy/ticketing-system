import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useSelector, useDispatch } from "react-redux";
import { showModal, closeModal } from "../features/antd/AntDSlice";
import { logout } from "../features/auth/AuthSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState("");
  const isAuthenticated = useSelector((state) => state.Auth.isAuthenticated);
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = (formType) => {
    console.log(formType);
    if (formType == "Login") {
      setForm("Login");
    } else if (formType == "Register") {
      setForm("Register");
    } else {
      message.error("Something went wrong");
    }
    setOpen(true);
  };

  const handleOk = () => {
    console.log("The modal will be closed after one second");
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(logout());
    console.log("Logout Successfull");
    navigate("/");
    message.success("Logout Successfull!");
  }

  return (
    <div className="header">
      <h2 className="text-xl font-semibold">Ticketing System</h2>
      {!isAuthenticated ? (
        <div className="flex gap-2">
          <Button onClick={() => openModal("Login")}>Login</Button>
          <Button type="primary" onClick={() => openModal("Register")}>
            Register
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center gap-2">
            <span className="border rounded-full px-2 py-1">{user.username.charAt(0).toUpperCase()}</span>
            <Button color="danger" variant="solid" onClick={() => handleLogout()}>
              Logout
            </Button>
          </div>
        </>
      )}
      <Modal
        title="Ticketing System"
        open={open}
        onCancel={handleCancel}
        footer={null}
        destroyOnHidden
      >
        {form == "Login" ? (
          <Login handleOk={handleOk} handleCancel={handleCancel} />
        ) : (
          <Register handleOk={handleOk} handleCancel={handleCancel} />
        )}
      </Modal>
    </div>
  );
};

export default Header;

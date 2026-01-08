import React, { useState } from 'react'
import { Button, Modal, message } from 'antd'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { useSelector, useDispatch } from 'react-redux'
import { showModal, closeModal } from '../features/antd/AntDSlice'

const Header = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState("");
  const isAuthenticated = useSelector((state) => state.Auth.isAuthenticated);
  const user = useSelector((state) => state.Auth.user);

  const openModal = (formType) => {
    console.log(formType);
    if(formType == "Login") {
      setForm("Login");
    } else if(formType == "Register") {
      setForm("Register");
    } else {
      message.error("Something went wrong");
    }
    setOpen(true);
  };

  const handleOk = () => {
    console.log('The modal will be closed after one second');
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <div className="header">
      <h2 className='text-xl font-semibold'>Ticketing System</h2>
      {!isAuthenticated ? <div className='flex gap-2'>
        <Button onClick={() => openModal("Login")}>Login</Button>
        <Button type="primary" onClick={() => openModal("Register")}>Register</Button>
      </div> : <div className="flex justify-center items-center border rounded-full p-2"><span>{user.email.charAt(0).toUpperCase()}</span></div>}
      <Modal
        title="Ticketing System"
        open={open}
        onCancel={handleCancel}
        footer={null}
        destroyOnHidden
      >
        {form == "Login" ? <Login handleOk={handleOk} handleCancel={handleCancel} /> : <Register handleOk={handleOk} handleCancel={handleCancel}/>} 
      </Modal>
    </div>
  )
}

export default Header;

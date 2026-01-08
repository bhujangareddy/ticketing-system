import { Button, Modal } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { showModal, closeModal } from '../features/antd/AntDSlice';
import Login from '../pages/Login';
import { Outlet } from 'react-router-dom';
import TicketScreen from "../components/TicketScreen";

const Main = () => {
  const isAuthenticated = useSelector((state) => state.Auth.isAuthenticated);
  const isModalOpen = useSelector((state) => state.AntD.isModalOpen);
  const dispatch = useDispatch();

  console.log(isModalOpen);

  function loginNow() {
    dispatch(showModal());
  }

  function handleCancel() {
    dispatch(closeModal());
  }

  const handleOk = () => {
    console.log('The modal will be closed after two seconds');
    setTimeout(() => {
      dispatch(closeModal())
    }, 2000);
  };

  return (
    <div className="main">
      {isAuthenticated ? <div><TicketScreen /></div> : <div className='text-center border rounded-2xl px-4 py-4 mx-20'>
        <h1 className='text-xl mb-2'>Ticketing System App</h1>
        <p className='py-2'>
          A ticketing system is a software solution that centralizes, organizes, and manages customer or employee support requests from initial submission to final resolution. Each request is converted into a unique "ticket," allowing support teams to efficiently track progress, prioritize issues, and ensure accountability. 
        </p>
        <Button type="primary" onClick={loginNow}>Login Now</Button>
      </div>}
      <Modal
        title="Ticketing System"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Login handleOk={handleOk}/> 
      </Modal>
    </div>
  )
}

export default Main

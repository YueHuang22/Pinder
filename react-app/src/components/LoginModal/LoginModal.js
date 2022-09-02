import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginModal.css'
import { useHistory, useLocation } from 'react-router-dom';


const LoginModal = () => {
    const history = useHistory();
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => { setShowModal(location.pathname === "/login") }, [location.pathname])


    return (
        <>
            <button className='login-button' onClick={() => {
                history.push("/login")
                setShowModal(true)
            }}>
                Log in
            </button>

            {showModal && (
                <Modal onClose={() => {
                    history.push("/")
                    setShowModal(false)
                }}>
                    <LoginForm />
                </Modal>
            )}
        </>
    );
}

export default LoginModal;
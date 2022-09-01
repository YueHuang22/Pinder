import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginModal.css'

const LoginModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='login-button' onClick={() => setShowModal(true)}>
                Log in
            </button>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    );
}

export default LoginModal;
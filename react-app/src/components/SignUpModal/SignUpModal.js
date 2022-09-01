import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';
import './SignUpModal.css'

const SignUpModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='signup-button' onClick={() => setShowModal(true)}>
                Sign up
            </button>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm />
                </Modal>
            )}
        </>
    );
}

export default SignUpModal;
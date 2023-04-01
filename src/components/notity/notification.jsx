import React, {useState} from 'react';
import {Toast, ToastContainer} from 'react-bootstrap';
import {god} from './18.png';

const Notify = ({message}) => {
    const [showToast, setShowToast] = useState(true);

    const handleToastClose = () => {
        setShowToast(false);
    };

    return (
        <ToastContainer position="top-end" className="p-3">
            {showToast && (
                <Toast onClose={handleToastClose}>
                    <Toast.Header>
                        <img src={'#'} className="rounded me-2" alt="logo"/>
                        <strong className="me-auto">Notification</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            )}
        </ToastContainer>
    );
};

export default Notify;

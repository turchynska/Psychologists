import css from './Modal.module.css';
import React from 'react';
import Icon from '../Icon/Icon';

const Modal = ({ isOpen, onClose, children }) => {
    if (isOpen) return null;

    return (
        <div className={css.containerModal} onClick={onClose}>
            <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={css.closeButton} onClick={onClose}>
                    <Icon className={css.icon} id='icon-close' width={20} height={20}/>
                </button>
                {children}
            </div>
        </div>
    )
}
export default Modal;
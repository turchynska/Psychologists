import css from './Modal.module.css';
import React from 'react';
import Icon from '../Icon/Icon.jsx';
import { useEffect } from 'react';

const Modal = ({  onClose, children }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [onClose]);

    const handleBlockDropClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    return (
      <div className={css.containerModal} onClick={handleBlockDropClick}>
        <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={css.closeButton}
                    onClick={onClose}
                    aria-label='Close modal button'
                >
            <Icon
              className={css.icon}
              id="icon-close"
              width={20}
              height={20}
            />
          </button>
          {children}
        </div>
      </div>
    );
}
export default Modal;
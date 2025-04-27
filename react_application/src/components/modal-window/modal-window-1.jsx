import React, {useCallback, useEffect, useState} from "react";
import "./modal-window.css";
import {createPortal} from "react-dom";

export default function ModalWindow1({trigger, children, onClose})
{
    const [isOpen, setIsOpen] = useState(false);
    const open  = () => setIsOpen(true);
    const close = useCallback(() => {
        setIsOpen(false);
        onClose?.();
    }, [onClose]);

    const onKeyDown = useCallback(e => {
        if (e.key === "Escape") close();
    }, [close]);

    useEffect(() => {
        if (isOpen) window.addEventListener("keydown", onKeyDown);
        else        window.removeEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen, onKeyDown]);

    const onOverlayClick = e => {
        if (e.target.classList.contains("modal")) close();
    };

    const triggerWithHandler = React.cloneElement(trigger, {
        onClick: open,
        onClickFunction: open,
    });

    return (
        <>
            {triggerWithHandler}
            {isOpen &&
                createPortal(
                    <div className="modal open" onClick={e => e.target.classList.contains("modal") && close()}>
                        <div className="modal__box" onClick={e => e.stopPropagation()}>
                            <button className="modal__close-btn" onClick={close}>&#10005;</button>
                            {typeof children === "function" ? children({close}) : children}
                        </div>
                    </div>,
                    document.body
                )
            }
        </>
    );
}
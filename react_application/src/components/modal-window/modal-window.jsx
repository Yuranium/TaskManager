import React, { useState, useEffect, useCallback } from "react";
import Button from "../button/button";
import "./modal-window.css";
import TaskForm from "../task-form/task-form";

export default function ModalWindow({isNewTask, projectId, children}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Escape") {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        } else {
            window.removeEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, handleKeyDown]);

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal"))
            setIsOpen(false);
    };

    return (
        <>

            <Button
                onClickFunction={() => setIsOpen(true)}>
                {!children ? 'Создать новую задачу' : children}
            </Button>
            <div
                className={`modal ${isOpen ? "open" : ""}`}
                onClick={handleOverlayClick}>
                <div className="modal__box" onClick={(e) => e.stopPropagation()}>
                    <button
                        className="modal__close-btn"
                        onClick={() => setIsOpen(false)}>
                        <svg
                            width="23"
                            height="25"
                            viewBox="0 0 23 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.09082 0.03125L22.9999 22.0294L20.909 24.2292L-8.73579e-05 2.23106L2.09082 0.03125Z"
                                fill="#333333"
                            />
                            <path
                                d="M0 22.0295L20.9091 0.0314368L23 2.23125L2.09091 24.2294L0 22.0295Z"
                                fill="#333333"
                            />
                        </svg>
                    </button>
                    <TaskForm
                        projectId={projectId}
                        isNewTask={true}
                        closeWindowFunc={() => setIsOpen(false)}/>
                </div>
            </div>
        </>
    );
}

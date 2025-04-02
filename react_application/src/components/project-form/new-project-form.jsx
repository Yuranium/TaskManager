import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './new-project-form.css'
import '../button/button.css'
import axios from "axios";
import Button from "../button/button";

const NewProjectForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        uploadProjectImage: null,
        projectName: '',
        projectDescription: '',
    });

    const [errors, setErrors] = useState({
        uploadProjectImage: '',
        projectName: '',
        projectDescription: '',
    });

    const handleChange = (e) => {
        const {name, value, files} = e.target;

        if (name === 'uploadProjectImage') {
            const file = files[0];
            setFormData({
                ...formData,
                [name]: file,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            uploadProjectImage: '',
            projectName: '',
            projectDescription: '',
        };

        if (!formData.uploadProjectImage) {
            newErrors.uploadProjectImage = 'Изображение обязательно для загрузки';
            isValid = false;
        } else {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(formData.uploadProjectImage.type)) {
                newErrors.uploadProjectImage = 'Недопустимый формат файла. Разрешены только JPEG, PNG и GIF.';
                isValid = false;
            } else if (formData.uploadProjectImage.size > (5 * 1024 * 1024)) {
                newErrors.uploadProjectImage = 'Файл слишком большой. Максимальный размер — 5 МБ.';
                isValid = false;
            }
        }

        if (!formData.projectName.trim()) {
            newErrors.projectName = 'Название проекта обязательно для заполнения';
            isValid = false;
        } else if (formData.projectName.length > 50) {
            newErrors.projectName = 'Название проекта не должно превышать 50 символов';
            isValid = false;
        }

        if (formData.projectDescription.length > 500) {
            newErrors.projectDescription = 'Описание проекта не должно превышать 500 символов';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const formDataToSend = new FormData();
            formDataToSend.append('avatars', formData.uploadProjectImage);
            formDataToSend.append('name', formData.projectName);
            formDataToSend.append('description', formData.projectDescription);

            try {
                const backHost = process.env.REACT_APP_BACKEND_PROJECT_SERVICE_HOST
                const backPort = process.env.REACT_APP_BACKEND_PORT

                await axios.post(`http://${backHost}:${backPort}/api/projects/createProject`,
                    formDataToSend, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                navigate('/')
            } finally {
            }
        } else {
            console.log('Форма содержит ошибки');
        }
    };

    return (
        <div className="main">
            <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
                <h3>Создание нового проекта</h3>
                <div className="input-wrap">
                    <label htmlFor="uploadProjectImage">Выберите фото для проекта</label>
                    <input
                        id="uploadProjectImage"
                        type="file"
                        name="uploadProjectImage"
                        accept="image/jpeg, image/png, image/gif"
                        onChange={handleChange}
                    />
                    {errors.uploadProjectImage && (
                        <span style={{color: 'red'}}>{errors.uploadProjectImage}</span>
                    )}
                </div>
                <div className="input-wrap">
                    <label htmlFor="projectName">Название проекта:</label>
                    <input
                        placeholder="Введите название проекта"
                        id="projectName"
                        type="text"
                        name="projectName"
                        onChange={handleChange}
                    />
                    {errors.projectName && (
                        <span style={{color: 'red'}}>{errors.projectName}</span>
                    )}
                </div>
                <div className="input-wrap">
                    <label htmlFor="projectDescription">Описание проекта:</label>
                    <textarea className="new-project-textarea"
                        placeholder="Описание проекта (опционально)"
                        id="projectDescription"
                        name="projectDescription"
                        rows="10"
                        onChange={handleChange}
                    />
                    {errors.projectDescription && (
                        <span style={{color: 'red'}}>{errors.projectDescription}</span>
                    )}
                </div>
                <Button>Создать</Button>
            </form>
        </div>
    );
};

export default NewProjectForm;
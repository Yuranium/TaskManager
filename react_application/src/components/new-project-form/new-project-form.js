import React from 'react';
import './new-project-form.css'

function NewProjectForm()
{
    const namePlaceHolder = "Введите название нового проекта";
    const descriptionPlaceHolder = "Описание проекта"
    return (
        <div>
            <form method={"POST"}>
                <p>
                    <input placeholder={namePlaceHolder}
                           type={"text"}
                           name={"projectName"}/>
                </p>
                <p>
                    <input placeholder={descriptionPlaceHolder}
                           type={"text"}
                           name={"projectDescription"}/>
                </p>
                <button type="submit">Создать</button>
            </form>
        </div>
    )
}

export default NewProjectForm;
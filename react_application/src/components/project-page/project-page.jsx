import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Button from "../button/button";
import './project-page.css'

export default function ProjectPage()
{
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const backHost = process.env.REACT_APP_BACKEND_PROJECT_SERVICE_HOST
                const backPort = process.env.REACT_APP_BACKEND_PORT
                const response = await axios.get(
                    `http://${backHost}:${backPort}/api/projects/${id}`);
                setProject(response.data);
                console.log(response.data)
            } catch (err) {
                navigate('/404');
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id, navigate]); // Повторный запрос при изменении ID

    if (loading) return <div>Загрузка проекта...</div>;
    if (!project) return <div>Проект не найден</div>;

    return (
        <div className="project-page-main">
            <div className="container">
                <a className="anchor-project-card" href={`/projects/${project.id}`}>
                    <div className="main-info">
                        <img
                            className="image-project-card"
                            src={`data:${project.avatars[0].contentType};base64,${project.avatars[0].binaryData}`}
                            alt={`Название: ${project.avatars[0].name}`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-image.jpg';
                            }}
                        />
                        <p className="project-name">{project.name}</p>
                    </div>
                    <div className="container-project-card-info">
                        <p>{project.description}</p>
                        <p>{`Дата создания: ${project.dateAdded}`}</p>
                    </div>
                    <div className="buttons">
                        <Button>Изменить</Button>
                        <Button>Удалить</Button>
                    </div>
                </a>
            </div>
        </div>
    );
}
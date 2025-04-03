import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ProjectCard from "../project-card/project-card";
import Button from "../button/button";
import './project-show.css'

const PAGE_SIZE = 15

export default function ProjectShow() {
    const navigate = useNavigate();
    const [projects, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPageNumber] = useState(0);

    const fetchProject = async () => {
        try {
            const backHost = process.env.REACT_APP_BACKEND_PROJECT_SERVICE_HOST
            const backPort = process.env.REACT_APP_BACKEND_PORT
            const response = await axios.get(
                `http://${backHost}:${backPort}/api/projects/allProjects`, {
                    params: {
                        pageNumber: page,
                        size: PAGE_SIZE
                    }
                });
            setProject(response.data);
            console.log(response.data, `page_number ${page}`)
            if (response.data.length > PAGE_SIZE - 1)
                setPageNumber(page => page + 1)
        } catch (err) {
            navigate('/404');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProject();
    }, [navigate]);

    if (loading) return <div>Загрузка проекта...</div>;
    if (!projects) return <div>Проект не найден</div>;

    return (
        <>
            {projects.map(element => {
                return <ProjectCard key={element.id}
                                    project={element}
                                    avatars={element.avatars}/>
            })}
            {projects.length > 14 &&
                <div className="project-show-button">
                    <Button onClickFunction={fetchProject}>Загрузить ещё</Button>
                </div>}
        </>
    )
}
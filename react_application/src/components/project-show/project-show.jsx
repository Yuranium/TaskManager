import { useNavigate } from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import ProjectCard from "../project-card/project-card";
import Button from "../button/button";
import './project-show.css';

const PAGE_SIZE = 15;

export default function ProjectShow() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPageNumber] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const didFetch = useRef(false);

    const fetchProject = async (pageToFetch) => {
        try {
            const backHost = process.env.REACT_APP_BACKEND_PROJECT_SERVICE_HOST;
            const backPort = process.env.REACT_APP_BACKEND_PORT;
            const response = await axios.get(
                `http://${backHost}:${backPort}/api/projects/allProjects`, {
                    params: {
                        pageNumber: pageToFetch,
                        size: PAGE_SIZE
                    }
                }
            );

            if (pageToFetch === 0)
                setProjects(response.data);
            else setProjects(prev => [...prev, ...response.data]);

            if (response.data.length < PAGE_SIZE)
                setHasMore(false);
        } catch (err) {
            navigate('/404');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!didFetch.current) {
            didFetch.current = true;
            fetchProject();
        }
    }, [page, navigate]);

    const handleLoadMore = () => {
        console.log(page)
        if (hasMore) {
            setPageNumber(prevPage => prevPage + 1);
        }
    };

    if (loading && projects.length === 0) return <div>Загрузка проекта...</div>;
    if (!projects || projects.length === 0) return <div>Проект не найден</div>;

    return (
        <>
            {projects.map(element => (
                <ProjectCard
                    key={element.id}
                    project={element}
                    avatars={element.avatars}
                />
            ))}
            {hasMore && (
                <div className="project-show-button">
                    <Button onClickFunction={handleLoadMore}>
                        Загрузить ещё
                    </Button>
                </div>
            )}
        </>
    );
}
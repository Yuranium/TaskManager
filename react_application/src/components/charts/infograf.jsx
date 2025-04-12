import './infograf.css'
import PieChart from "./pie-chart/pie-chart";
import Background from "../info/background";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import LoadingData from "../info/loading-data/loading-data";
import BarChart from "./bar-chart/bar-chart";

export default function Infograf()
{
    const [data, setData] = useState([]);
    const [tasks, setTasks] = useState();
    const [loading, setLoading] = useState(true);
    const didFetch = useRef(false);

    const backHost = process.env.REACT_APP_BACKEND_PROJECT_SERVICE_HOST;
    const backPort = process.env.REACT_APP_BACKEND_PORT;

    const fetchData = async () => {
        try {

            const projectResponse= await axios.get(
                `http://${backHost}:${backPort}/api/projects/allProjects`, {
                    params: {
                        size: 100
                    }
                })

            console.log(projectResponse.data.map(project => project.id))
            const taskResponse = await axios.get(
                `http://${backHost}:${backPort}/api/tasks/allTasks-ProjectIds`, {
                    params: {
                        uuids: projectResponse.data.map(project => project.id).join(',')
                    }
                }
            )

            if (projectResponse.status === 200 && taskResponse.status === 200)
            {
                const projects = projectResponse.data;
                const tasks = taskResponse.data;

                const projectStats = projects.map(project => ({
                    id: project.id,
                    name: project.name,
                    taskCount: tasks.filter(task => task.projectId === project.id).length
                }));

                console.log(projectStats)
                setTasks(tasks)
                setData(projectStats)

            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!didFetch.current) {
            didFetch.current = true;
            fetchData();
        }
    }, []);

    if (loading)
        return <LoadingData/>

    return (
        <div className="infograf-main">
            <Background/>
            <div className="charts">
                <div className="chart">
                    <PieChart data={data}/>
                    <p className="chart-description">
                        Инфографика отображения задач в каждом проекте
                    </p>
                </div>
                <div className="chart">
                    <BarChart data={data} tasks={tasks}/>
                    <p className="chart-description">
                        Инфографика отображения задач в каждом проекте
                    </p>
                </div>
            </div>
        </div>
    )
}
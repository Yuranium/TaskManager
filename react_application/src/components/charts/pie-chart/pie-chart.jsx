import {Pie} from "react-chartjs-2";
import {ArcElement, Chart, Legend, Tooltip} from "chart.js";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import LoadingData from "../../info/loading-data/loading-data";

Chart.register(Tooltip, Legend, ArcElement)

export default function PieChart()
{
    const [data, setData] = useState([])
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

    const generateRandomColor = (count, transparency = 0.7) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            const hue = (i * 360 / count) % 360;
            colors.push(`hsla(${hue}, 70%, 50%, ${transparency})`);
        }
        return colors;
    }

    const dataChart = {
        labels: data.map(project => project.name),
        datasets: [
            {
                label: 'Количество задач в проекте',
                data: data.map(project => project.taskCount),
                backgroundColor: generateRandomColor(data.length),
                borderWidth: 1,
                borderColor: generateRandomColor(data.length, 1),
                hoverOffset: 4
            }
        ]
    }

    return(<Pie data={dataChart}/>)
}
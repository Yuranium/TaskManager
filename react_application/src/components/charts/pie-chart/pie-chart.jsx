import {Pie} from "react-chartjs-2";
import {ArcElement, Chart, Legend, Tooltip} from "chart.js";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import LoadingData from "../../info/loading-data/loading-data";

Chart.register(Tooltip, Legend, ArcElement)

export default function PieChart({chartData})
{
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true);
    const didFetch = useRef(false);

    const backHost = process.env.REACT_APP_BACKEND_PROJECT_SERVICE_HOST;
    const backPort = process.env.REACT_APP_BACKEND_PORT;

    const fetchData = async () => {
        try {

            await axios.get(`http://${backHost}:${backPort}/api/projects/chart/allProjects`, {
                params: {
                    size: 100
                }
            })
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

    const dataChart = {
        labels: data.taskName,
        data: data.taskCount,
        backGroundColor: [
            "rgba(255, 99, 132, 0.2)",
        ]
    }

    return(<Pie data={chartData}/>)
}
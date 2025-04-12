import './bar-chart.css';
import { Bar } from 'react-chartjs-2';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarChart({ data, tasks }) {
    // Подсчет задач по статусам для проекта
    const groupTaskStatus = (tasks, projectId) => {
        const statusCount = {
            planing: 0,
            in_progress: 0,
            completed: 0,
            canceled: 0,
            expired: 0,
        };

        tasks
            .filter(task => task.projectId === projectId)
            .forEach(task => {
                const statusKey = task.taskStatus.toLowerCase();
                if (statusCount.hasOwnProperty(statusKey)) {
                    statusCount[statusKey] += 1;
                }
            });

        return statusCount;
    };

    // Добавляем данные о статусах в проекты
    const processedData = data.map((project) => ({
        ...project,
        taskStatusCount: groupTaskStatus(tasks, project.id),
    }));

    const generateStatusColors = (count) => {
        return Array.from({ length: count }, (_, i) => {
            const hue = (i * 360) / count;
            return `hsla(${hue}, 70%, 50%, 0.7)`;
        });
    };

    const statusKeys = ['planing', 'in_progress', 'completed', 'canceled', 'expired'];
    const statusColors = generateStatusColors(statusKeys.length);

    const chartData = {
        labels: statusKeys.map(status => status.toUpperCase()),
        datasets: statusKeys.map((statusKey, idx) => ({
            label: statusKey.toUpperCase().replace(/_/g, ' '),
            data: processedData.map((project) => project.taskStatusCount[statusKey]),
            backgroundColor: statusColors[idx],
            borderColor: statusColors[idx].replace('0.7)', '1)'),
            borderWidth: 1,
        })),
    };

    return <Bar data={chartData} />;
}
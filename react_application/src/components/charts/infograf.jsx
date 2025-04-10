import './infograf.css'
import PieChart from "./pie-chart/pie-chart";
import Background from "../info/background";

export default function Infograf()
{
    return (
        <div className="infograf-main">
            <Background/>
            <div className="charts">
                <div className="chart">
                    <PieChart/>
                    <p className="chart-description">
                        Инфографика отображения задач в каждом проекте
                    </p>
                </div>
            </div>
        </div>
    )
}
import './loading-data.css'

export default function LoadingData({loadingName})
{
    return (
        <div className="loading-main">
            <span>
            {`Загрузка ${loadingName || 'информации'}`}
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
            </span>
        </div>
    )
}
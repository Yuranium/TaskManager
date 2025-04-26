import './loading-data.css'

export default function LoadingData({loadingName, defaultName, defaultFont})
{
    return (
        <div className="loading-main"
            style={defaultFont ? {fontSize: "unset"} : {fontSize: "large"}}>
            <span>
            {defaultName || `Загрузка ${loadingName || 'информации'}`}
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
            </span>
        </div>
    )
}
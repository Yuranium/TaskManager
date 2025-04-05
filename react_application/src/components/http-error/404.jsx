import './404.css'

export default function Http404()
{
    return (
    <div className="container404">
        <div className="error-container">
            <div className="error-code">404</div>
            <div className="error-message">Страница не найдена</div>
            <p>К сожалению, страница, которую вы ищете, не найдена.</p>
            <p>Пожалуйста, проверьте URL-адрес или вернитесь на <a href="/">домашнюю страницу</a>.</p>
        </div>
    </div>
    )
}
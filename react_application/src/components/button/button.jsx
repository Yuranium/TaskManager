export default function Button({children, isActive = true, onClickFunction}) {
    return (
        <button
            className={isActive ? `button` : `button disabled`}
            onClick={onClickFunction}>
            {children}
        </button>
    )
}
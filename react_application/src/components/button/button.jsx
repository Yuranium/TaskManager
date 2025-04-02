export default function Button({children, isActive = true}) {
    return (
        <button
            className={isActive ? `button` : `button disabled`}>
            {children}
        </button>
    )
}
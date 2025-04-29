export default function Button({children, isActive = true, onClickFunction, ...props}) {
    return (
        <button type={props.type || "button"}
            style={props.backgroundColor && { backgroundColor: props.backgroundColor }}
            className={isActive ? `button` : `button disabled`}
            onClick={onClickFunction}>
            {children}
        </button>
    )
}
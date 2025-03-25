import classes from "./button.css";

export default function Button({isActive = true}) {
    return (
        <button
            className={isActive ? `${classes.button}` : `${classes.button} ${classes.disabled}`}>
        </button>
    )
}
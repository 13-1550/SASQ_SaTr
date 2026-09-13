function Button({
    children,
    type = "green",
    onClick
}) {
    return (
        <button
            className={`btn btn-${type}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
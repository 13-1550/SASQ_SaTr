function Input({ 
    label, 
    type = "text", 
    placeholder = "", 
    value, 
    onChange 
}) {
    return (
        <div className="input-container">
            {label && <label>{label}</label>}

            <input
                className="input"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default Input;
import React from "react";
import "./Input.css";

export default function Input({
  label,
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  options = [], // for type="select"
  rows = 4, // for type="textarea"
  className = "",
  ...props
}) {
  const inputId = id || name;

  return (
    <div className={`form-field ${error ? "has-error" : ""} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label} {required && <span className="required-star">*</span>}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          id={inputId}
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className="form-control form-textarea"
          {...props}
        />
      ) : type === "select" ? (
        <div className="select-wrapper">
          <select
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className="form-control form-select"
            {...props}
          >
            {options.map((opt, i) => (
              <option key={i} value={typeof opt === "object" ? opt.value : opt}>
                {typeof opt === "object" ? opt.label : opt}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className="form-control form-input"
          {...props}
        />
      )}

      {error ? (
        <span className="field-message error-message">{error}</span>
      ) : helperText ? (
        <span className="field-message helper-message">{helperText}</span>
      ) : null}
    </div>
  );
}

import React from "react";
import { MdAddCircleOutline } from "react-icons/md";

export default function FormRow({
  name,
  type = "text",
  label,
  value,
  placeholder,
  onChange,
  validation,
  hasButton = false,
  buttonAction,
}) {
  return (
    <div className="form-row">
      <div>
        <label htmlFor="title" className="new-task-field-label">
          {label}
        </label>
      </div>
      <div>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder ? placeholder : ""}
          onChange={onChange}
          value={value}
        />
        {hasButton && <MdAddCircleOutline onClick={buttonAction} />}
        {validation}
      </div>
    </div>
  );
}

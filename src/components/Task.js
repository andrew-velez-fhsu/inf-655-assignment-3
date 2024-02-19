import React from "react";
import CloseButton from "react-bootstrap/CloseButton";

const Task = ({ task, onChange, onDelete }) => {
  return (
    <div className="">
      <input
        type="checkbox"
        checked={task.isComplete}
        onChange={(e) => {
          onChange({
            ...task,
            isComplete: e.target.checked,
          });
        }}
      />
      <span className="Task">
        {task.isComplete ? <del>{task.title}</del> : task.title}
      </span>
      <CloseButton
        onClick={() => {
          onDelete(task.id);
        }}
      />
    </div>
  );
};

export default Task;

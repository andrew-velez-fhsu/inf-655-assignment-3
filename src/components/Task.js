import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";

const Task = ({ task, onChange, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.title}
          onChange={(e) => {
            onChange({ ...task, title: e.target.value });
          }}
        />
        <Button variant="link" onClick={() => setIsEditing(false)}>
          Save
        </Button>
      </>
    );
  } else {
    taskContent = (
      <span className="Task">
        {task.isComplete ? <del>{task.title}</del> : task.title}
        <Button variant="link" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      </span>
    );
  }

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
      {taskContent}
      <CloseButton
        onClick={() => {
          onDelete(task.id);
        }}
      />
    </div>
  );
};

export default Task;

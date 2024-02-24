import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import Card from "./shared/card";

const Task = ({ task, onChange, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <label htmlFor="name">Name:</label>
        <input
          value={task.title}
          name="name"
          onChange={(e) => {
            onChange({ ...task, title: e.target.value });
          }}
        />
        <label htmlFor="description">Description:</label>
        <input
          name="description"
          value={task.description}
          onChange={(e) => {
            onChange({ ...task, description: e.target.value });
          }}
        />
        <Button variant="link" onClick={() => setIsEditing(false)}>
          Save
        </Button>
      </>
    );
  } else {
    taskContent = (
      <>
        <div className="flow-column display-task">
          <div className="task-name">
            {task.isComplete ? <del>{task.title}</del> : task.title}
          </div>
          <div className="task-description">
            {task.isComplete ? <del>{task.description}</del> : task.description}
          </div>
        </div>
        <Button variant="link" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      </>
    );
  }

  return (
    <Card className="card task">
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
    </Card>
  );
};

export default Task;

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import Card from "./shared/card";
import SubTasks from "./SubTasks";
import FormRow from "./shared/formRow";

const Task = ({ task, onChange, onDelete, onChangeSubTask }) => {
  const [isEditing, setIsEditing] = useState(false);

  let taskContent;
  if (isEditing) {
    taskContent = (
      <div className="task-edit">
        <FormRow
          name="title"
          label="Title:"
          value={task.title}
          onChange={(e) => {
            onChange({ ...task, title: e.target.value });
          }}
        />
        <FormRow
          name="description"
          label="Description:"
          value={task.description}
          onChange={(e) => {
            onChange({ ...task, description: e.target.value });
          }}
        />
        <Button
          variant="primary"
          onClick={() => {
            setIsEditing(false);
          }}
        >
          Save
        </Button>
      </div>
    );
  } else {
    taskContent = (
      <div className="task-details">
        <div className="">
          <div className="task-name">
            {task.isComplete ? <del>{task.title}</del> : task.title}
          </div>
          <div className="task-description">
            {task.isComplete ? <del>{task.description}</del> : task.description}
          </div>
        </div>
        <div>
          <Button variant="secondary" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="task">
      <div className="task-content">
        <div>
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
        </div>
        {taskContent}
        <CloseButton
          className="close-button"
          onClick={() => {
            onDelete(task.id);
          }}
        />
      </div>
      <SubTasks
        className="task-subtask"
        subTasks={task.subTasks}
        enableCompletion={true}
        onChangeSubTask={onChangeSubTask}
      />
    </Card>
  );
};

export default Task;

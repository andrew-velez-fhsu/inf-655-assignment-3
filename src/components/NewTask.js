import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "./shared/card";

const NewTask = ({ onAddTask }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Card>
      <div className="new-task">
        <div className="new-task-heading">
          <h2>Add new task</h2>
        </div>
        <div className="new-task-form">
          <div className="new-task-field">
            <label class="new-task-field-label">Name:</label>
            <input
              type="text"
              placeholder="Name of task"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="new-task-field">
            <label class="new-task-field-label">Description:</label>
            <input
              type="text"
              placeholder="Enter a task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button
            id="addNewTask"
            variant="primary"
            onClick={() => {
              setName("");
              setDescription("");
              onAddTask(name, description);
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NewTask;

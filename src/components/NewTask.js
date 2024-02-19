import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Stack } from "react-bootstrap";

const NewTask = ({ onAddTask }) => {
  const [description, setDescription] = useState("");

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h2>Add new task</h2>
      </div>
      <div className="panel-body">
        <Form.Label>Task Description:</Form.Label>
        <Form.Group controlId="newTask">
          <Form.Control
            type="text"
            placeholder=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Form.Text className="text-muted">Enter a task description</Form.Text>
        </Form.Group>

        <Button
          id="addNewTask"
          variant="primary"
          onClick={() => {
            setDescription("");
            onAddTask(description);
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default NewTask;

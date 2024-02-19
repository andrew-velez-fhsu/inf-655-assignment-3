import { Button, Stack } from "react-bootstrap";
import Task from "./Task.js";
import { useState } from "react";

const TaskList = ({ tasks, onChange, onDelete }) => {
  let heading = `Tasks: ${tasks ? tasks.length : 0}`;
  const [filter, setFilter] = useState(0);

  let displayTasks;
  switch (filter) {
    case 0: //show all
      displayTasks = tasks;
      break;
    case 1: //show incomplete
      displayTasks = tasks.filter((task) => task.isComplete === false);
      break;
    case 2: //show complete
      displayTasks = tasks.filter((task) => task.isComplete === true);
      break;
  }

  return (
    <div className="Task-List panel">
      <div className="panel-heading">
        <h3>{heading}</h3>
      </div>
      <div className="panel-body">
        <div className="filter">
          <Stack gap={2} direction="horizontal">
            <Button variant="link" onClick={() => setFilter(0)}>
              Show All [{tasks.length}]
            </Button>
            <Button variant="link" onClick={() => setFilter(1)}>
              Show Incomplete [
              {tasks.filter((task) => task.isComplete === false).length}]
            </Button>
            <Button variant="link" onClick={() => setFilter(2)}>
              Show Complete [
              {tasks.filter((task) => task.isComplete === true).length}]
            </Button>
          </Stack>
        </div>
        <ul>
          {displayTasks.map((task) => (
            <Task task={task} onChange={onChange} onDelete={onDelete} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;

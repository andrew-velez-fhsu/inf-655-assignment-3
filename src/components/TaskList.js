import { Button, Stack } from "react-bootstrap";
import Task from "./Task";
import { useState } from "react";
import Card from "./shared/card";

const TaskList = ({ tasks, onChange, onDelete, onChangeSubTask }) => {
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
    default:
      console.warn("Undefined filter value");
      break;
  }

  return (
    <Card className="flexColumn task-list">
      <div>
        <h3>{heading}</h3>
      </div>
      <div>
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
        <div className="task-container">
          {displayTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onChange={onChange}
              onDelete={onDelete}
              onChangeSubTask={onChangeSubTask}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TaskList;

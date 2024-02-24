import React, { useState } from "react";
import NewTask from "./NewTask";
import TaskList from "./TaskList";

const TaskForm = () => {
  let initialTaskId = 1;
  const [nextTaskId, setNextTaskId] = useState(initialTaskId);
  const initialTasks = [];
  const [tasks, setTasks] = useState(initialTasks);

  const handleAddTask = (name, description) => {
    setTasks([
      ...tasks,
      {
        title: name,
        description: description,
        id: nextTaskId,
        isComplete: false,
      },
    ]);
    setNextTaskId((a) => a + 1);
    console.log(`Created task id ${nextTaskId}`);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === updatedTask.id) {
          return updatedTask;
        } else {
          return t;
        }
      })
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  return (
    <>
      <NewTask onAddTask={handleAddTask} />
      <hr />
      <TaskList
        tasks={tasks}
        onChange={handleUpdateTask}
        onDelete={handleDeleteTask}
      />
    </>
  );
};

export default TaskForm;

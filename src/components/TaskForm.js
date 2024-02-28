import React, { useState } from "react";
import NewTask from "./NewTask";
import TaskList from "./TaskList";
import { ulid } from "ulid";

const TaskForm = () => {
  const initialTasks = [];
  const [tasks, setTasks] = useState(initialTasks);

  const handleAddTask = (title, description, subTasks) => {
    const nextTaskId = ulid();
    setTasks([
      ...tasks,
      {
        title: title,
        description: description,
        id: nextTaskId,
        isComplete: false,
        subTasks: subTasks,
      },
    ]);

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

  const handleUpdateSubTask = (updatedSubTask) => {
    const updatedTasks = tasks.map((t) => {
      if (t.subTasks.filter((st) => st.key === updatedSubTask.key)) {
        const updatedTask = { ...t };
        updatedTask.subTasks = t.subTasks.map((st) => {
          if (st.key === updatedSubTask.key) {
            return updatedSubTask;
          } else {
            return st;
          }
        });
        return updatedTask;
      } else {
        return t;
      }
    });
    setTasks(updatedTasks);
  };

  return (
    <>
      <NewTask onAddTask={handleAddTask} />
      <hr />
      <TaskList
        tasks={tasks}
        onChange={handleUpdateTask}
        onDelete={handleDeleteTask}
        onChangeSubTask={handleUpdateSubTask}
      />
    </>
  );
};

export default TaskForm;

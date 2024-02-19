import Task from "./Task.js";

const TaskList = ({ tasks, onChange, onDelete }) => {
  let heading = `Tasks: ${tasks ? tasks.length : 0}`;
  return (
    <div className="Task-List panel">
      <div className="panel-heading">
        <h3>{heading}</h3>
      </div>
      <div className="panel-body">
        <ul>
          {tasks.map((task) => (
            <Task task={task} onChange={onChange} onDelete={onDelete} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;

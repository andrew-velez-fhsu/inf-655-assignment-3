import { MdOutlineRemoveCircleOutline } from "react-icons/md";

export default function SubTasks({
  subTasks,
  setSubTasks,
  enableDelete,
  onChangeSubTask,
  className,
}) {
  return (
    <div className={className + " form-row"}>
      <div>Sub tasks:</div>
      <div>
        <ul>
          {subTasks.map((subTask) => {
            return (
              <li key={subTask.key}>
                {onChangeSubTask && (
                  <input
                    type="checkbox"
                    checked={subTask.isComplete}
                    className="subTask-checkbox"
                    onChange={(e) => {
                      onChangeSubTask({
                        ...subTask,
                        isComplete: e.target.checked,
                      });
                    }}
                  />
                )}
                {subTask.isComplete ? (
                  <del>{subTask.title}</del>
                ) : (
                  subTask.title
                )}
                {enableDelete && (
                  <MdOutlineRemoveCircleOutline
                    onClick={() => {
                      setSubTasks((subTasks) =>
                        subTasks.filter((s) => s.key !== subTask.key)
                      );
                    }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

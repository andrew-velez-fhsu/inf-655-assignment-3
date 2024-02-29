import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import Card from "./shared/card";
import FormRow from "./shared/formRow";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { ulid } from "ulid";
import { useFormik } from "formik";
import * as Yup from "yup";

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

  const subTaskFormik = useFormik({
    initialValues: {
      subTask: "",
    },
    onSubmit: (values) => {
      const newSubTasks = [
        ...task.subTasks,
        {
          key: ulid(),
          title: values.subTask,
          isComplete: false,
        },
      ];
      const updatedTask = { ...task, subTasks: newSubTasks };
      onChange(updatedTask);
      subTaskFormik.values.subTask = "";
    },
    validationSchema: Yup.object({
      subTask: Yup.string()
        .required()
        .max(255, "Must be 255 characters or less"),
    }),
  });

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
      <div className="task-subtask form-row">
        <div>Sub tasks:</div>
        <div>
          <ul>
            {task.subTasks.map((subTask) => {
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
                  {isEditing && (
                    <MdOutlineRemoveCircleOutline
                      onClick={() => {
                        console.log("here");
                        const remainingSubTasks = task.subTasks.filter(
                          (s) => s.key !== subTask.key
                        );
                        onChange({ ...task, subTasks: remainingSubTasks });
                        // setSubTasks((subTasks) =>
                        //   subTasks.filter((s) => s.key !== subTask.key)
                        // );
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {isEditing && (
        <FormRow
          name="subTask"
          label="Add subtask:"
          value={subTaskFormik.values.subTask}
          onChange={subTaskFormik.handleChange}
          placeholder="(optional)"
          hasButton={true}
          buttonAction={subTaskFormik.handleSubmit}
          validation={
            subTaskFormik.errors.subTask && subTaskFormik.touched.subTask ? (
              <div className="error-text">* {subTaskFormik.errors.subTask}</div>
            ) : (
              ""
            )
          }
        />
      )}
    </Card>
  );
};

export default Task;

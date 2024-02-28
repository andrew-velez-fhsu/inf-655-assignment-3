import React, { useState } from "react";
import Card from "./shared/card";
import { useFormik } from "formik";
import { ulid } from "ulid";
import * as Yup from "yup";
import FormRow from "./shared/formRow";
import SubTasks from "./SubTasks";
import { Button } from "react-bootstrap";

const NewTask = ({ onAddTask }) => {
  const [subTasks, setSubTasks] = useState([]);
  const [subTaskError, setSubTaskError] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      subTask: "",
    },
    onSubmit: (values) => {
      onAddTask(values.title, values.description, subTasks);
      formik.values.title = "";
      formik.values.description = "";
      formik.values.subTask = "";
      setSubTasks([]);
    },
    validationSchema: Yup.object({
      title: Yup.string().required().max(255, "Must be 255 characters or less"),
      description: Yup.string(),
    }),
  });

  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <div className="new-task">
          <div className="new-task-heading">
            <h2>Add new task</h2>
          </div>
          <div className="new-task-form">
            <FormRow
              name="title"
              label="Title:"
              onChange={formik.handleChange}
              value={formik.values.title}
              placeholder="Name of task"
              validation={
                formik.errors.title && formik.touched.title ? (
                  <div className="error-text">* {formik.errors.title}</div>
                ) : (
                  ""
                )
              }
            />
            <FormRow
              name="description"
              label="Description"
              onChange={formik.handleChange}
              placeholder="Enter a description of the task"
              value={formik.values.description}
              validation={
                formik.errors.description && formik.touched.description ? (
                  <div className="error-text">
                    * {formik.errors.description}
                  </div>
                ) : (
                  ""
                )
              }
            />
            <FormRow
              name="subTask"
              label="Add subtask:"
              value={formik.values.subTask}
              onChange={formik.handleChange}
              placeholder="(optional)"
              hasButton={true}
              buttonAction={() => {
                if (formik.values.subTask) {
                  setSubTaskError(false);
                  const subTaskName = formik.values.subTask;
                  setSubTasks((s) => [
                    ...s,
                    {
                      key: ulid(),
                      title: subTaskName,
                      isComplete: false,
                    },
                  ]);
                  formik.values.subTask = "";
                } else setSubTaskError(true);
              }}
              validation={
                subTaskError && formik.touched.subTask ? (
                  <div className="error-text">* Sub task is required</div>
                ) : (
                  ""
                )
              }
            />
            {subTasks && subTasks.length > 0 && (
              <SubTasks
                subTasks={subTasks}
                setSubTasks={setSubTasks}
                enableDelete={true}
              />
            )}
            <Button variant="primary" id="addNewTask" type="submit">
              Add
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default NewTask;

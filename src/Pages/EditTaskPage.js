import React, { useEffect, useState } from "react";
import TaskForm from "../Components/TaskForm";
import { getTasks, updateTask } from "../Services/taskService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditTaskPage = () => {
  const [task, setTask] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      const tasks = await getTasks();
      let taskToEdit = tasks.find((t) => t._id === id);
      taskToEdit = {
        ...taskToEdit,
        taskDetails: taskToEdit.additionalDetails,
      };
      setTask(taskToEdit);
    };

    fetchTask();
  }, [id]);

  const handleUpdateTask = async (updatedTask) => {
    console.log("Update", updatedTask);
    const id = updatedTask.get("id"); // Get ID from formData
    try {
      await updateTask(id, updatedTask);
      toast.success("Task Updated Successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Task</h1>
      <TaskForm onSubmit={handleUpdateTask} initialData={task} update="true" />
    </div>
  );
};

export default EditTaskPage;

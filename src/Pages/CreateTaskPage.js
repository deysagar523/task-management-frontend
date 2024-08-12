import React from "react";
import TaskForm from "../Components/TaskForm";
import { createTask } from "../Services/taskService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateTaskPage = () => {
  const navigate = useNavigate();

  const handleCreateTask = async (task) => {
    console.log("Create", task);
    try {
      await createTask(task);
      toast.success("Task created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  return (
    <div>
      <h1>Create Task</h1>
      <TaskForm onSubmit={handleCreateTask} />
    </div>
  );
};

export default CreateTaskPage;

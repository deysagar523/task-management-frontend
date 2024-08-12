import React, { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../Services/taskService";
import TaskItem from "./TaskItem";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

const TaskList = ({ filterByCompletion, tasks, setTasks }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTasks(tasks);
    };

    fetchTasks();
  }, [setTasks]);

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const handleTaskComplete = async (id, task) => {
    let updatedTask = {
      ...task,
      isCompleted: true,
    };
    try {
      await updateTask(task._id, updatedTask);
      let updatedTasks = tasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      );
      setTasks(updatedTasks);
      toast.success("Task Completed Successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  const filteredTasks = filterByCompletion
    ? tasks.filter((task) => task.isCompleted)
    : tasks;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Task Name</StyledTableCell>
            <StyledTableCell>Estimated Time (In Days)</StyledTableCell>
            <StyledTableCell>Task Details</StyledTableCell>
            <StyledTableCell>Completion Status</StyledTableCell>
            <StyledTableCell>Attachment</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onDelete={handleDelete}
                onComplete={handleTaskComplete}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography align="center">No Data Present</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskList;

import React from "react";
import { TableRow, TableCell, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import showConfirmDialog from "./showConfirmDialog.js";
import { toast } from "react-toastify";

const TaskItem = ({ task, onDelete, onComplete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id, taskName) => {
    let message = `Do you want to delete the task (${taskName})?`;
    let confirmed = await showConfirmDialog(message);
    if (confirmed) {
      onDelete(id);
      toast.success(`Task (${taskName}) is deleted successfully`);
    }
  };

  // Adjust URL based on Cloudinary resource type
  const pdfUrl = task.document
    ? task.document
    : "";

  return (
    <TableRow>
      <TableCell>{task.taskName}</TableCell>
      <TableCell>{task.estimatedTime}</TableCell>
      <TableCell>
        {task.additionalDetails !== "" ? task.additionalDetails : "NA"}
      </TableCell>
      <TableCell>{task.isCompleted ? "Completed" : "Incomplete"}</TableCell>
      <TableCell>
        {pdfUrl ? (
          <Typography
            component="a"
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </Typography>
        ) : (
          "NA"
        )}
      </TableCell>
      <TableCell>
        {!task.isCompleted && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/edit/${task._id}`)}
            sx={{ m: 2 }}
          >
            Edit
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDelete(task._id, task.taskName)}
          sx={{ m: 2 }}
        >
          Delete
        </Button>
        {!task.isCompleted && (
          <Button
            variant="contained"
            color="success"
            onClick={() => onComplete(task._id, task)}
            sx={{ m: 2 }}
          >
            Complete
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default TaskItem;

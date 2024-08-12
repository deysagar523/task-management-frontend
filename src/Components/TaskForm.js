import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";

const TaskForm = ({ onSubmit, initialData = {}, update }) => {
  const [taskVars, setTaskVars] = useState({
    taskName: initialData.taskName || "",
    taskDetails: initialData.taskDetails || "",
    estimatedTime: initialData.estimatedTime || "",
    document: initialData.document || null,
  });

  const [errors, setErrors] = useState({
    estimatedTime: "",
  });

  const handleChange = (field, val) => {
    setTaskVars({
      ...taskVars,
      [field]: val,
    });

    // Validate field if necessary
    if (field === "estimatedTime" && val && isNaN(val)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        estimatedTime: "Estimated time must be a number.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        estimatedTime: "",
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTaskVars({
        ...taskVars,
        document: file,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNaN(taskVars.estimatedTime)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        estimatedTime: "Estimated time must be a number.",
      }));
      return;
    }

    const formData = new FormData();
    formData.append("taskName", taskVars.taskName);
    formData.append("additionalDetails", taskVars.taskDetails);
    formData.append("estimatedTime", taskVars.estimatedTime);
    formData.append("document", taskVars.document);

    if (update) {
      formData.append("id", initialData._id);
    }

    onSubmit(formData);
  };

  return (
    <Grid
      container
      spacing={2}
      component="form"
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center" }}
    >
      <Grid item xs={12} md={6}>
        <TextField
          label="Task Name"
          value={taskVars.taskName}
          onChange={(e) => handleChange("taskName", e.target.value)}
          fullWidth
          margin="normal"
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Estimated Time (In Days)"
          value={taskVars.estimatedTime}
          onChange={(e) => handleChange("estimatedTime", e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.estimatedTime}
          helperText={errors.estimatedTime}
          required
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          multiline
          label="Task Details"
          value={taskVars.taskDetails}
          onChange={(e) => handleChange("taskDetails", e.target.value)}
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <Button type="submit" variant="contained" color="primary">
          {update ? "Update" : "Submit"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default TaskForm;

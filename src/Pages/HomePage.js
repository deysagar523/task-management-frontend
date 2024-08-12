import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import TaskList from "../Components/TaskList";
import * as XLSX from "xlsx";
import { createTask } from "../Services/taskService";
import { toast } from "react-toastify";

const HomePage = () => {
  const [filterByCompletion, setFilterByCompletion] = useState(false);
  const [tasks, setTasks] = useState([]); // State for tasks
  const navigate = useNavigate();

  // Function to handle navigation to the Create Task page
  const goToCreatePage = () => {
    navigate("/create");
  };

  // Function to toggle filter by completion
  const toggleFilter = () => {
    setFilterByCompletion(!filterByCompletion);
  };

  const handleBulkUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      console.log("worksheet", worksheet);

      let hasSuccess = [];

      for (const [index, row] of worksheet.entries()) {
        const taskData = {
          taskName: row.taskName,
          additionalDetails: row.taskDetails,
          estimatedTime: row.estimatedTime,
        };

        try {
          const createdTask = await createTask(taskData); // Send each task to the server
          hasSuccess.push(createdTask); // Push the newly created task
        } catch (error) {
          console.error("Error creating task:", error);
          toast.error(
            `The data is not correct for row no ${index + 1}, ${error}`
          );
        }
      }

      if (hasSuccess.length > 0) {
        toast.success(`Data uploaded successfully for ${hasSuccess.length} rows`);
        setTasks((prevTasks) => [...prevTasks, ...hasSuccess]); // Update the tasks state
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Grid container spacing={3} padding={2}>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h3" gutterBottom>
          Task Manager
        </Typography>
      </Grid>
      <Grid
        item
        xs={6}
        md={8}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={toggleFilter}
          sx={{ m: 1 }}
        >
          {filterByCompletion ? "Show All" : "Filter By Completion"}
        </Button>
      </Grid>
      <Grid
        item
        xs={3}
        md={2}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={goToCreatePage}
          sx={{ m: 1 }}
        >
          Create Task
        </Button>
      </Grid>
      <Grid
        item
        xs={3}
        md={2}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          component="label"
          color="secondary"
          sx={{ m: 1 }}
        >
          Bulk Upload
          <input
            type="file"
            hidden
            accept=".xlsx, .xls"
            onChange={handleBulkUpload}
          />
        </Button>
      </Grid>

      <Grid item xs={12}>
        <TaskList 
          tasks={tasks} 
          setTasks={setTasks} 
          filterByCompletion={filterByCompletion} 
        />
      </Grid>
    </Grid>
  );
};

export default HomePage;




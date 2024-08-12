import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CreateTaskPage from "./Pages/CreateTaskPage";
import EditTaskPage from "./Pages/EditTaskPage";
import "./App.css";


const App = () => {
  console.log("App.js");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateTaskPage />} />
        <Route path="/edit/:id" element={<EditTaskPage />} />
      </Routes>
    </Router>
  );
};

export default App;

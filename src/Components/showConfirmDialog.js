// showConfirmDialog.js
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Typography } from "@mui/material";

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div>
      <Typography>{message}</Typography>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button onClick={onConfirm} color="success" variant="contained">
          Ok
        </Button>
        <Button onClick={onCancel} variant="outlined" color="error">
          Cancel
        </Button>
      </div>
    </div>
  );
};

const showConfirmDialog = (message) => {
  return new Promise((resolve) => {
    const onConfirm = () => {
      resolve(true);
      toast.dismiss();
    };

    const onCancel = () => {
      resolve(false);
      toast.dismiss();
    };

    toast(
      <ConfirmDialog
        message={message}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />,
      {
        autoClose: false,
      }
    );
  });
};

export default showConfirmDialog;

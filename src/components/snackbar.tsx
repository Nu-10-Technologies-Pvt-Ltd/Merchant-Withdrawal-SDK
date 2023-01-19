import { Snackbar, Alert } from "@mui/material";
import React from "react";

function SnackBar(props: any): JSX.Element {
  const { open, message, setOpen, severity } = props;
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): any => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackBar;

import { Box, Typography, Stack, TextField, Button } from "@mui/material";
import React from "react";
import SnackBar from "../../components/snackbar";

function TwoFa() {
  const handleSubmit = (e: any): any => {
    e.preventDefault();
  };

  const handleChange =
    (name: any): any =>
    (event: any) => {};

  return (
    <div>
      <Box
        sx={{
          backgroundColor: "#1E2959",
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ backgroundColor: "#fff", p: 5, borderRadius: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "700",
              fontSize: "24px",
              lineHeight: "29px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#1E2959",
              mb: 2,
            }}
          >
            ENTER YOUR EMAIL ID FOR 2FA
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack
              direction="column"
              spacing={2}
              sx={{ width: "100%", margin: "0 auto" }}
            >
              <Stack spacing={2}>
                <Typography variant="body2">Emaild </Typography>
                <TextField
                  id="outlined-basic"
                  size="small"
                  fullWidth
                  // label="Outlined"
                  placeholder="Emailid"
                  variant="outlined"
                  onChange={handleChange}
                  required
                  type={"text"}
                />
              </Stack>

              <Button
                type="submit"
                variant="contained"
                sx={{ background: "#1E2959" }}
              >
                Submit
              </Button>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "500",
                  fontSize: "12px",
                  lineHeight: "15px",
                  color: "#1E2959",
                }}
              >
                Forgotten account?
              </Typography>
            </Stack>
          </form>
        </Box>
        {/* <SnackBar
          open={open}
          message={errorMessage}
          setOpen={setOpen}
          severity="error"
        /> */}
      </Box>
    </div>
  );
}

export default TwoFa;

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
// import { BitcoinLogo } from "../../assets"

const Login = (): JSX.Element => {
  const [authData, setAuthData] = useState({
    email: "",
    opt: null || 0
  })
  return (
    <>
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
            LOGIN TO YOUR ACCOUNT
          </Typography>

          <Stack
            direction="column"
            spacing={2}
            sx={{ width: "100%", margin: "0 auto" }}
          >
            <Stack spacing={2}>
              <Typography variant="body2">Your Email </Typography>
              <TextField
                id="outlined-basic"
                size="small"
                fullWidth
                placeholder="test@email.com"
                variant="outlined"
              />
            </Stack>
            <Button variant="contained" sx={{ background: "#1E2959" }}>
              Send OTP
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
        </Box>
      </Box>
    </>
  );
};

export default Login;

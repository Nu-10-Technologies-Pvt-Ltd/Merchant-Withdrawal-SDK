import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SnackBar from "../../components/snackbar";
import LoginUser from "./services";
// import { BitcoinLogo } from "../../assets"

// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//   props,
//   ref
// ) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });
const Login = (): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // const [validationErrors, setValidationErrors] = useState({});
  const handleChange =
    (name: any): any =>
    (event: any) => {
      if (name === "userName") {
        setUserName(event.target.value);
      } else {
        setPassword(event.target.value);
      }

      // const nextErrors = { ...validationErrors };
      // if (event.target.value !==null) {
      //   nextErrors[name] = [];
      // }
      // setValidationErrors(nextErrors);
    };

  const handleSubmit = (e: any): any => {
    e.preventDefault();
    void loginUser();
  };

  const navigate = useNavigate();
  const loginUser = async (): Promise<any> => {
    const Result = await LoginUser({
      username: userName,
      password,
    });
    if (Result.status === "success") {
      console.log(Result.data);
      navigate("/crypto_transaction");
      //   } else if (Result.status === "unauthorized") {
      //     toast.error(`Session Expired, You will be redireted to the Login page.`, {
      //       theme: "colored",
      //     });
      //     setTimeout(() => {
      //       removeToken();
      //     }, 10000);
    } else {
      // toast.error(`Error! ${Result.errors[0]}.`, {
      //   theme: "colored",
      // });
      //   }
      // }
      // alert(Result.errors);
      setErrorMessage(Result.errors);
      setOpen(true);
    }
  };

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
            LOGIN TO WITHDRAWAL SDK
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack
              direction="column"
              spacing={2}
              sx={{ width: "100%", margin: "0 auto" }}
            >
              <Stack spacing={2}>
                <Typography variant="body2">Username </Typography>
                <TextField
                  id="outlined-basic"
                  size="small"
                  fullWidth
                  // label="Outlined"
                  placeholder="Username"
                  variant="outlined"
                  onChange={handleChange("userName")}
                  required
                  type={"text"}
                />
              </Stack>
              <Stack spacing={2}>
                <Typography variant="body2">Password </Typography>
                <TextField
                  id="outlined-basic"
                  size="small"
                  fullWidth
                  // label="Outlined"
                  placeholder="Password"
                  variant="outlined"
                  onChange={handleChange("password")}
                  required
                  type={"password"}
                />
              </Stack>

              <Button
                type="submit"
                variant="contained"
                sx={{ background: "#1E2959" }}
              >
                Login
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
        <SnackBar
          open={open}
          message={errorMessage}
          setOpen={setOpen}
          severity="error"
        />
      </Box>
    </>
  );
};

export default Login;

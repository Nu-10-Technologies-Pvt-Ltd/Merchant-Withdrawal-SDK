import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../../components/appbar";
import sendCrypto from "./services";
import SnackBar from "../../components/snackbar";
import Footer from "../../components/footer";
import { useGlobalContext } from "../../context/context";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { v4 as uuidv4 } from "uuid";
function Approval() {
  const [timeLeft, setTimeLeft] = useState<number>(-1);

  useEffect(() => {
    console.log(timeLeft);
    if (timeLeft === -1) return;
    if (timeLeft === 0) {
      console.log("TIME LEFT IS 0");
      // setTimeLeft(null);
      navigate("/crypto-transaction", { replace: true });
    }

    // exit early when we reach 0
    // if (timeLeft===-1) return;

    // save intervalId to clear the interval when the
    // component re-renders

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);
  const [open, setOpen] = React.useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [openSnack, setOpenSnack] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [severity, setSeverity] = useState("error");

  const navigate = useNavigate();
  const { state } = useLocation();
  // console.log(state, "state in approval");
  const [allCryptoTnxData, setAllCryptoTnxData] = useState([]);
  const { stateContext } = useGlobalContext();
  console.log(stateContext);
  const token = stateContext.token;
  useEffect(() => {
    if (state) setAllCryptoTnxData(state.slice(1));
  }, [state]);

  useEffect(() => {
    // Prompt confirmation when reload page is triggered
    window.onbeforeunload = () => {
      return navigate("/crypto-transaction");
    };

    // Unmount the window.onbeforeunload event
    return () => {
      window.onbeforeunload = null;
    };
  }, []);
  // useEffect(() => {
  //   setApprovedData({ transaction: allCryptoTnxData });
  // }, [allCryptoTnxData]);
  const [approvedData, setApprovedData] = useState({
    transactions: [],
  });
  const [approved, setApproved] = useState(
    Array(allCryptoTnxData.length).fill(false)
  );
  //  var approved = Array(allCryptoTnxData.length).fill(false);

  const handleDelete = (cryptoIndex: any) => {
    setAllCryptoTnxData((prevState) =>
      prevState.filter((_, index) => index !== cryptoIndex)
    );
  };
  const handleApprove = (cryptoIndex: any) => {
    let newArr = [...approved];

    newArr[cryptoIndex] = true;
    setApproved(newArr);
    setApprovedData({
      transactions: [
        ...approvedData.transactions,
        allCryptoTnxData[cryptoIndex],
      ],
    });
  };
  const handleApproveAll = () => {
    setApproved(Array(allCryptoTnxData.length).fill(true));
    setApprovedData({ transactions: [...allCryptoTnxData] });
    console.log(approved, "aa");
  };
  const myuuid = uuidv4();
  const handleSend = async (): Promise<any> => {
    console.log(approvedData);
    if (approvedData.transactions.length === 0) {
      setErrorMessage("Please approve atleast one row");
      setSeverity("error");
      setOpenSnack(true);
      return;
    }

    const Result = await sendCrypto({
      ...approvedData,
      batch_details: {
        batch_id: myuuid,
        merchant_id: token,
        merchant_name: "sushant gawai",
        tenant_id: token,
      },
    });
    console.log(Result.status);
    if (Result.status === "success") {
      setDialogMessage("Data uploaded successfully");
      setSendSuccess(true);
      setOpen(true);
      setTimeLeft(10);
      // console.log(Result.data);
      // setLoadingBar(false);
      //   } else if (Result.status === "unauthorized") {
      //     toast.error(`Session Expired, You will be redireted to the Login page.`, {
      //       theme: "colored",
      //     });
      //     setTimeout(() => {
      //       removeToken();
      //     }, 10000);
      //   } else {
      //     toast.error(`Error! ${Result.errors[0]}.`, {
      //       theme: "colored",
      //     });
      //   }
    } else {
      setDialogMessage(Result.errors);
      setSendSuccess(false);
      setOpen(true);
      setTimeLeft(10);
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "#f9fafe",
      }}
    >
      <ResponsiveAppBar page="Approval" />
      <Box
        sx={{
          backgroundColor: "#f9fafe",
        }}
        pl={4}
        pr={4}
        pb={4.5}
      >
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table
            sx={{
              // "&.MuiTable-root": {
              //   paddingLeft: "16px",
              //   paddingRight: "16px",
              //   borderCollapse: "separate",
              // },
              minWidth: 650,
              borderSpacing: "0 1.5em",
              borderCollapse: "separate",
              backgroundColor: "#f9fafe",
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                {[
                  "User Address",
                  "Username",
                  "Fiat Coin",
                  "Crypto Coin",
                  "Amount(Fiat)",
                ].map((item): any => (
                  <TableCell
                    align="justify"
                    key={item}
                    sx={{
                      fontWeight: "500",
                      lineHeight: "150%",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      color: "#C4C4C4",
                      borderBottom: "none",
                      // backgroundColor: "#f9fafe",
                    }}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {allCryptoTnxData.length > 0
                ? allCryptoTnxData.map((row: any, cryptoIndex) => (
                    <TableRow
                      key={row.username}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        background: "#FFFFFF",
                        boxShadow: "0px 4px 4px rgba(210, 207, 227, 0.25)",
                        borderRadius: "7px",
                        marginBottom: "10px",
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        // sx={{ display: "flex", alignItems: "center" }}
                        sx={{
                          fontWeight: "500",
                          fontSize: "13px",
                          lineHeight: "180.5%",
                          color: "#201B3F",
                        }}
                      >
                        {row.address}
                      </TableCell>
                      <TableCell
                        align="justify"
                        sx={{
                          fontWeight: "500",
                          fontSize: "13px",
                          lineHeight: "180.5%",
                          color: "#201B3F",
                        }}
                      >
                        {row.username}
                      </TableCell>
                      <TableCell
                        align="justify"
                        sx={{
                          fontWeight: "500",
                          fontSize: "13px",
                          lineHeight: "180.5%",
                          color: "#201B3F",
                        }}
                      >
                        {row.currency}
                      </TableCell>
                      <TableCell
                        align="justify"
                        sx={{
                          fontWeight: "500",
                          fontSize: "13px",
                          lineHeight: "180.5%",
                          color: "#201B3F",
                        }}
                      >
                        {row.currency}
                      </TableCell>
                      <TableCell
                        align="justify"
                        sx={{
                          fontWeight: "500",
                          fontSize: "13px",
                          lineHeight: "180.5%",
                          color: "#201B3F",
                        }}
                      >
                        {row.amount}
                      </TableCell>
                      <TableCell align="justify">
                        <Stack
                          spacing={1}
                          direction={"row"}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          {!approved[cryptoIndex] ? (
                            <Button
                              variant="contained"
                              color="primary"
                              style={{ background: "#1E2959" }}
                              onClick={() => handleApprove(cryptoIndex)}
                            >
                              <DoneIcon />
                            </Button>
                          ) : (
                            ""
                          )}
                          {!approved[cryptoIndex] ? (
                            <Button
                              variant="contained"
                              color="error"
                              style={{ color: "#FFF", borderColor: "#1E2959" }}
                              onClick={() => handleDelete(cryptoIndex)}
                            >
                              <CloseIcon />
                            </Button>
                          ) : (
                            ""
                          )}
                          {/* <Button
                        variant="outlined"
                        style={{ color: "#1E2959", borderColor: "#1E2959" }}
                      >
                        Deposit
                      </Button> */}
                          {approved[cryptoIndex] ? (
                            <Stack
                              sx={{
                                boxSizing: "border-box",
                                width: "87.84px",
                                height: "28.05px",
                                left: "1246px",
                                top: "168px",
                                background: "rgba(52, 163, 83, 0.12)",
                                border: "1px solid #34A353",
                                borderRadius: "44px",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontFamily: "'Inter'",
                                  fontStyle: "normal",
                                  fontWeight: "500",
                                  fontSize: "13px",
                                  lineHeight: "180.5%",
                                  alignItems: "center",
                                  color: "#34A353",
                                }}
                              >
                                Approved
                              </Typography>
                            </Stack>
                          ) : (
                            ""
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                : "No Data"}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack spacing={1} direction={"row"}>
          <Button
            variant="contained"
            color="primary"
            style={{ background: "#1E2959" }}
            onClick={handleApproveAll}
          >
            Approve All
          </Button>

          <div>
            <Button
              variant="contained"
              color="error"
              style={{ color: "#FFF", borderColor: "#1E2959" }}
              onClick={handleSend}
            >
              Send
            </Button>

            <Dialog
              open={open}
              // onClose={}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Status"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Stack sx={{ display: "flex", alignItems: "center" }}>
                    {sendSuccess ? (
                      <CheckCircleRoundedIcon color="success" />
                    ) : (
                      <CancelRoundedIcon color="error" />
                    )}
                    {dialogMessage}
                    <Typography sx={{ fontWeight: "bold" }}>
                      {" "}
                      {sendSuccess ? "" : "Please try again in sometime"}
                    </Typography>
                    <Typography>
                      Redirecting you to homepage in{" "}
                      <span style={{ fontWeight: "bold" }}>{timeLeft}</span>{" "}
                      seconds
                    </Typography>
                    <Typography>
                      Please click below if you're not redirected automatically.
                    </Typography>
                  </Stack>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ background: "#1E2959" }}
                  onClick={() =>
                    navigate("/crypto-transaction", { replace: true })
                  }
                >
                  Homepage
                </Button>
                {/* <Button onClick={handleClose}>Try Again</Button> */}
              </DialogActions>
            </Dialog>
          </div>
        </Stack>
      </Box>
      <SnackBar
        open={openSnack}
        message={errorMessage}
        setOpen={setOpenSnack}
        severity={severity}
      />
      <Footer />
    </Box>
  );
}

export default Approval;

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

function Approval() {
  const [open, setOpen] = React.useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

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
      return "";
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
    cryptoTnx: [],
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
      cryptoTnx: [...approvedData.cryptoTnx, allCryptoTnxData[cryptoIndex]],
    });
  };
  const handleApproveAll = () => {
    setApproved(Array(allCryptoTnxData.length).fill(true));
    setApprovedData({ cryptoTnx: [...allCryptoTnxData] });
    console.log(approved, "aa");
  };
  const handleSend = async (): Promise<any> => {
    console.log(approvedData);
    if (approvedData.cryptoTnx.length === 0) {
      setErrorMessage("Please approve atleast one row");
      setSeverity("error");
      setOpenSnack(true);
      return;
    }
    const Result = await sendCrypto({
      ...approvedData,
      batchTnx: {
        merchant_id: token,
        merchant_name: "sushant gawai",
        tenant_id: token,
      },
    });
    console.log(Result.status);
    if (Result.status === "success") {
      setDialogMessage("Data uploaded successfully");
      setOpen(true);
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
      setOpen(true);
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
                  "Amount",
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
                      key={row.user_name}
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
                        {row.user_address}
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
                        {row.user_name}
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
                        {row.crypto_coin}
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
                        {row.fiat}
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
                  {dialogMessage}
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
                  Go to Homepage
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

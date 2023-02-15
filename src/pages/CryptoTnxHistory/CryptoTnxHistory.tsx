import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import getTxnHistory from "./services";
import ResponsiveAppBar from "../../components/appbar";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Footer from "../../components/footer";
import moment from "moment";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const CryptoTnxHistory = () => {
  const [data, setData] = useState({ status: "", message: "", data: [] });
  const getTxnHistoryData = async (): Promise<any> => {
    const Result = await getTxnHistory();
    if (Result.status === "success") {
      setData(Result.data);
      console.log(Result.data);
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
      // }
    }
  };
  useEffect(() => {
    void getTxnHistoryData();
  }, []);

  function MainTable() {
    const [open, setOpen] = React.useState("");

    const handleClickOpen = (id: number) => {
      setOpen("dialog" + id);
    };
    const handleClose = () => {
      setOpen("");
    };
    return (
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
                "Batch Id",
                "Requested Time",
                "Transaction Hash",
                "Status",
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
            {data.data.length > 0
              ? data.data
                  .slice(0)
                  .reverse()
                  .map((row: any, cryptoIndex) => (
                    <TableRow
                      key={row.id}
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
                        sx={{
                          fontWeight: "500",
                          fontSize: "13px",
                          lineHeight: "180.5%",
                          color: "#201B3F",
                        }}
                      >
                        {row.id}
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
                        {moment(row.createdAt).format(
                          "dddd, MMMM Do YYYY, h:mm:ss a"
                        )}
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
                        {/* {row.uuid} */}
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
                        {row.transaction[0].status}
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
                        {row.transaction
                          .map((item: any) => item.amount)
                          .reduce((prev: any, next: any) =>
                            (parseFloat(prev) + parseFloat(next)).toFixed(8)
                          )}
                      </TableCell>

                      <TableCell align="justify">
                        <Stack spacing={1} direction={"row"}>
                          <Button
                            key={"button" + row.id}
                            variant="contained"
                            color="primary"
                            style={{
                              color: "#FFF",
                              backgroundColor: "#1E2959",
                            }}
                            onClick={() => handleClickOpen(row.id)}
                          >
                            View Details
                          </Button>
                          <BootstrapDialog
                            key={"dialog" + row.id}
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open === "dialog" + row.id}
                            fullWidth={true}
                            maxWidth={"lg"}
                            sx={{
                              ".MuiPaper-root": {
                                mx: 3,
                              },
                            }}
                          >
                            {/* <BootstrapDialogTitle
                            id="customized-dialog-title"
                            onClose={handleClose}
                          >
                            Batch Details
                          </BootstrapDialogTitle> */}
                            <DialogContent
                              dividers
                              sx={{ backgroundColor: "#f9fafe" }}
                            >
                              {open && (
                                <SecondTable
                                  key={"second-table" + row.id}
                                  data={row.transaction}
                                  merchant_name={row.merchant_name}
                                />
                              )}
                            </DialogContent>
                            {/* <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                              Return to Batch Table
                            </Button>
                          </DialogActions> */}
                          </BootstrapDialog>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
              : "No Data"}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  function SecondTable(props: any) {
    const { data, merchant_name } = props;
    console.log(data, "inside second table");
    return (
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table
          sx={{
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
                "Merchant Name",
                "Username",
                "Crypto Coin",
                "Fiat Coin",
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
            {data.length > 0
              ? data.map((row: any) => (
                  <TableRow
                    key={row.uuid}
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
                      {merchant_name}
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
                    <TableCell
                      align="justify"
                      sx={{
                        fontWeight: "500",
                        fontSize: "13px",
                        lineHeight: "180.5%",
                        color: "#201B3F",
                      }}
                    ></TableCell>
                  </TableRow>
                ))
              : "No Data"}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return (
    <Box sx={{ backgroundColor: "#f9fafe" }}>
      <ResponsiveAppBar page="Crypto Transaction History" />
      <Box pl={4} pr={4} pb={4.5} sx={{ backgroundColor: "#f9fafe" }}>
        <MainTable />
      </Box>
      <Footer />
    </Box>
  );
};

export default CryptoTnxHistory;

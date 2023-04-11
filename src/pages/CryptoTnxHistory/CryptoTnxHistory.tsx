import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
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
import { useGlobalContext } from "../../context/context";

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
  const [data, setData] = useState([]);
  const { stateContext } = useGlobalContext();
  console.log(stateContext);
  const token = stateContext.token;
  const [loadingBar, setLoadingBar] = useState(true);
  const getTxnHistoryData = async (): Promise<any> => {
    const Result = await getTxnHistory(token);
    console.log(Result);
    if (Result.status === "success") {
      setData(Result.data);
      console.log(Result.data);
      setLoadingBar(false);
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
    } else {
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

    const styleTableCell = {
      fontWeight: "500",
      fontSize: "13px",
      lineHeight: "180.5%",
      color: "#201B3F",
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
              {["Batch Id", "Requested Time", "Status", "Amount(Fiat)"].map(
                (item): any => (
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
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length > 0
              ? data
                  .slice(0)
                  .reverse()
                  .map((row: any, cryptoIndex) => (
                    <TableRow
                      key={row.batch_details.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        background: "#FFFFFF",
                        boxShadow: "0px 4px 4px rgba(210, 207, 227, 0.25)",
                        borderRadius: "7px",
                        marginBottom: "10px",
                      }}
                    >
                      <TableCell component="th" scope="row" sx={styleTableCell}>
                        {row.batch_details.id}
                      </TableCell>
                      <TableCell align="justify" sx={styleTableCell}>
                        {moment(row.batch_details.createdAt).format(
                          "dddd, MMMM Do YYYY, h:mm:ss a"
                        )}
                      </TableCell>

                      <TableCell align="justify" sx={styleTableCell}>
                        {/* {row.transaction[0].status} */} true
                      </TableCell>
                      <TableCell align="justify" sx={styleTableCell}>
                        {row.transaction.length > 0
                          ? row.transaction
                              .map((item: any) => item.amountinusd)
                              .reduce((prev: any, next: any) =>
                                (parseFloat(prev) + parseFloat(next)).toFixed(8)
                              )
                          : 0}
                      </TableCell>

                      <TableCell align="justify">
                        <Stack spacing={1} direction={"row"}>
                          <Button
                            key={"button" + row.batch_details.id}
                            variant="contained"
                            color="primary"
                            style={{
                              color: "#FFF",
                              backgroundColor: "#1E2959",
                            }}
                            onClick={() =>
                              handleClickOpen(row.batch_details.id)
                            }
                          >
                            View Details
                          </Button>
                          <BootstrapDialog
                            key={"dialog" + row.batch_details.id}
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open === "dialog" + row.batch_details.id}
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
                                  key={"second-table" + row.batch_details.id}
                                  data={row.transaction}
                                  merchant_name={
                                    row.batch_details.merchant_name
                                  }
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
    const styleTableCell = {
      fontWeight: "500",
      fontSize: "13px",
      lineHeight: "180.5%",
      color: "#201B3F",
    };
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
                "Transaction Hash",
                "Status",
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
                    <TableCell component="th" scope="row" sx={styleTableCell}>
                      {row.address}
                    </TableCell>
                    <TableCell align="justify" sx={styleTableCell}>
                      {merchant_name}
                    </TableCell>
                    <TableCell align="justify" sx={styleTableCell}>
                      {row.username}
                    </TableCell>
                    <TableCell align="justify" sx={styleTableCell}>
                      {row.incomingtransactionhash}
                    </TableCell>
                    <TableCell align="justify" sx={styleTableCell}>
                      {row.status}
                    </TableCell>
                    <TableCell align="justify" sx={styleTableCell}>
                      {row.currency}
                    </TableCell>
                    <TableCell align="justify" sx={styleTableCell}>
                      {row.fiat}
                    </TableCell>
                    <TableCell align="justify" sx={styleTableCell}>
                      {row.amountinusd}
                    </TableCell>
                    <TableCell align="justify" sx={styleTableCell}></TableCell>
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

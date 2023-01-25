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
  const [data, setData] = useState({
    status: true,
    message: "",
    data: [],
  });
  const getTxnHistoryData = async (): Promise<any> => {
    const Result = await getTxnHistory();
    if (Result.status === "success") {
      setData(Result.data);
      console.log(data);
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

    const handleClickOpen = (batchID: number) => {
      setOpen("dialog" + batchID);
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
                    fontWeight: "600",

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
            {data != null
              ? data.data.map((row: any, cryptoIndex) => (
                  <TableRow
                    key={row.batchID}
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
                    >
                      {row.batchID}
                    </TableCell>
                    <TableCell align="justify">{row.createdAt}</TableCell>
                    <TableCell align="justify">{row.uuid}</TableCell>
                    <TableCell align="justify">true</TableCell>
                    <TableCell align="justify">
                      {row.transaction
                        .map((item: any) => item.amount)
                        .reduce((prev: any, next: any) => prev + next)}
                    </TableCell>

                    <TableCell align="justify">
                      <Stack spacing={1} direction={"row"}>
                        <Button
                          key={"button" + row.batchID}
                          variant="contained"
                          color="primary"
                          style={{ color: "#FFF", backgroundColor: "#1E2959" }}
                          onClick={() => handleClickOpen(row.batchID)}
                        >
                          View Details
                        </Button>
                        <BootstrapDialog
                          key={"dialog" + row.batchID}
                          onClose={handleClose}
                          aria-labelledby="customized-dialog-title"
                          open={open === "dialog" + row.batchID}
                          fullWidth={true}
                          maxWidth={"lg"}
                        >
                          <BootstrapDialogTitle
                            id="customized-dialog-title"
                            onClose={handleClose}
                          >
                            Batch Details
                          </BootstrapDialogTitle>
                          <DialogContent dividers>
                            {open && (
                              <SecondTable
                                key={"second-table" + row.batchID}
                                data={row.transaction}
                              />
                            )}
                          </DialogContent>
                          <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                              Return to Batch Table
                            </Button>
                          </DialogActions>
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
    const { data } = props;
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
                "Foreign Id",
                "Crypto Coin",
                "Fiat Coin",
                "Amount",
              ].map((item): any => (
                <TableCell
                  align="justify"
                  key={item}
                  sx={{
                    fontWeight: "600",

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
                      // sx={{ display: "flex", alignItems: "center" }}
                    >
                      {row.user_address}
                    </TableCell>
                    <TableCell align="justify">{row.foreignID}</TableCell>
                    <TableCell align="justify">{row.crypto_coin}</TableCell>
                    <TableCell align="justify">{row.flat_coin}</TableCell>
                    <TableCell align="justify">{row.amount}</TableCell>
                    <TableCell align="justify"></TableCell>
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
      <Box pl={4} pr={4} sx={{ backgroundColor: "#f9fafe" }}>
        <MainTable />
      </Box>
    </Box>
  );
};

export default CryptoTnxHistory;

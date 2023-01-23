import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";
import ResponsiveAppBar from "../../components/appbar";

function Approval() {
  const { state } = useLocation();
  // console.log(state, "state in approval");
  useEffect(() => {
    setAllCryptoTnxData(state.slice(1));
  }, [state]);
  const [allCryptoTnxData, setAllCryptoTnxData] = useState([]);
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
  };
  const handleApproveAll = () => {
    setApproved(Array(allCryptoTnxData.length).fill(true));
    console.log(approved, "aa");
  };
  return (
    <Box>
      <ResponsiveAppBar page="Approval" />
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
                "Fiat Coin",
                "Crypto Coin",
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
            {allCryptoTnxData.length > 0
              ? allCryptoTnxData.map((row: any, cryptoIndex) => (
                  <TableRow
                    key={row.foreignID}
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
                    <TableCell align="justify">
                      <Stack spacing={1} direction={"row"}>
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
                        <Button
                          variant="contained"
                          color="error"
                          style={{ color: "#FFF", borderColor: "#1E2959" }}
                          onClick={() => handleDelete(cryptoIndex)}
                        >
                          <CloseIcon />
                        </Button>
                        {/* <Button
                        variant="outlined"
                        style={{ color: "#1E2959", borderColor: "#1E2959" }}
                      >
                        Deposit
                      </Button> */}
                        {approved[cryptoIndex] ? (
                          <Stack sx={{ backgroundColor: "green" }}>
                            Approved
                          </Stack>
                        ) : (
                          <Stack>Approved</Stack>
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
          Appove ALl
        </Button>

        <Button
          variant="contained"
          color="error"
          style={{ color: "#FFF", borderColor: "#1E2959" }}
          onClick={() => {}}
        >
          Send
        </Button>
      </Stack>
    </Box>
  );
}

export default Approval;

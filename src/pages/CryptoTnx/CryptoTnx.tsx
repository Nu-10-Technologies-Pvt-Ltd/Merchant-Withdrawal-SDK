import React, { useState, useEffect } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/system";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../../components/appbar";
import Footer from "../../components/footer";
import SnackBar from "../../components/snackbar";
const CryptoTnx = () => {
  // State declarations  -------------
  const [openSnack, setOpenSnack] = React.useState(false);
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = React.useState("");
  const [submit, setSubmit] = useState(false);
  const [allCryptoTnxData, setAllCryptoTnxData] = useState([
    {
      user_address: "",
      foreignID: "",
      crypto_coin: "",
      fiat_coin: "",
      amount: 0,
    },
  ]);
  const [cryptoTnxData, setCryptoTnxData] = useState({
    user_address: "",
    foreignID: "",
    crypto_coin: "",
    fiat_coin: "",
    amount: 0,
  });

  const navigate = useNavigate();

  // functions declarations ------------
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "user_address" || name === "foreignID") {
      if (/^[a-zA-Z0-9]*$/i.test(value)) {
        setCryptoTnxData({
          ...cryptoTnxData,
          [name]: value,
        });
      }
    } else if (name === "crypto_coin" || name === "fiat_coin") {
      if (/^[a-zA-Z]*$/i.test(value)) {
        setCryptoTnxData({
          ...cryptoTnxData,
          [name]: value,
        });
      }
    } else {
      setCryptoTnxData({
        ...cryptoTnxData,
        [name]: e.target.valueAsNumber,
      });
    }
  };
  const insertTransaction = async () => {
    console.log("function is calling...");
    console.log("these is tnx Data", cryptoTnxData);
    if (
      cryptoTnxData.user_address === "" ||
      cryptoTnxData.amount === 0 ||
      cryptoTnxData.crypto_coin === "" ||
      cryptoTnxData.foreignID === "" ||
      cryptoTnxData.fiat_coin === ""
    ) {
      setMessage("Please add all the fields");
      setSeverity("error");
      setOpenSnack(true);
    } else {
      setOpenSnack(false);
      setAllCryptoTnxData([...allCryptoTnxData, cryptoTnxData]);
      setCryptoTnxData({
        user_address: "",
        foreignID: "",
        crypto_coin: "",
        fiat_coin: "",
        amount: 0,
      });
      console.log(allCryptoTnxData, "inside ");
    }
  };

  // const handleSubmit = () => {
  //     navigate("/crypto-transaction-history", {
  //         state: allCryptoTnxData
  //     })
  // }
  useEffect(() => {
    console.log(cryptoTnxData);
  }, [cryptoTnxData]);

  useEffect(() => {
    console.log("useEffect");
    if (submit === true) {
      if (allCryptoTnxData.length > 1) {
        navigate("/approval", { state: allCryptoTnxData });
      } else {
        setMessage("Please Add at least one entry ");
        setSeverity("error");
        setOpenSnack(true);
      }
    }
  }, [allCryptoTnxData, navigate, submit]);
  const handleSubmit = async () => {
    if (
      cryptoTnxData.user_address !== "" ||
      cryptoTnxData.amount !== 0 ||
      cryptoTnxData.crypto_coin !== "" ||
      cryptoTnxData.foreignID !== "" ||
      cryptoTnxData.fiat_coin !== ""
    ) {
      if (
        cryptoTnxData.user_address === "" ||
        cryptoTnxData.amount === 0 ||
        cryptoTnxData.crypto_coin === "" ||
        cryptoTnxData.foreignID === "" ||
        cryptoTnxData.fiat_coin === ""
      ) {
        setMessage("Please add all the fields");
        setSeverity("error");
        setOpenSnack(true);
      } else {
        setOpenSnack(false);
        setAllCryptoTnxData([...allCryptoTnxData, cryptoTnxData]);
        setCryptoTnxData({
          user_address: "",
          foreignID: "",
          crypto_coin: "",
          fiat_coin: "",
          amount: 0,
        });
        setSubmit(true);
      }
    } else {
      setSubmit(true);
    }
  };

  const readExcel = (file: Blob) => {
    setLoaderOpen(true);
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target?.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        console.log(error, "file upload");
        reject(error);
      };
    });
    promise.then((d: any) => {
      console.log(d, "excel");
      let excelCheck = true;
      if (d.length === 0) {
        excelCheck = false;
      }
      for (var i = 0; i < d.length; i++) {
        if (
          Object.keys(d[i]).length === 5 &&
          d[i].hasOwnProperty("user_address") &&
          d[i].hasOwnProperty("foreignID") &&
          d[i].hasOwnProperty("crypto_coin") &&
          d[i].hasOwnProperty("fiat_coin") &&
          d[i].hasOwnProperty("amount")
        ) {
          if (
            !/^[a-zA-Z0-9]+$/i.test(d[i].user_address) ||
            !/^[a-zA-Z0-9]+$/i.test(d[i].foreignID) ||
            !/^[a-zA-Z]+$/i.test(d[i].crypto_coin) ||
            !/^[a-zA-Z]+$/i.test(d[i].fiat_coin) ||
            !/^[0-9]+(\.[0-9]+)?$/i.test(d[i].amount)
          ) {
            excelCheck = false;
            break;
          }
        } else {
          excelCheck = false;
          break;
        }
      }
      if (excelCheck) {
        setAllCryptoTnxData((prev) => [...prev, ...d]);
        setLoaderOpen(false);
      } else {
        setMessage("incomplete data or format in excel");
        setSeverity("error");
        setOpenSnack(true);
        setLoaderOpen(false);
      }
    });
  };

  return (
    <Box sx={{ backgroundColor: "#f9fafe" }}>
      <ResponsiveAppBar page="Crypto Transaction" />
      <Box sx={{ mt: 1, mx: 5, pb: 4.5 }}>
        <Stack
          direction={"column"}
          sx={{ alignItems: "center", minHeight: "70vh" }}
        >
          <Grid container>
            <Grid item xs={12} lg={12} mt={3}>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/crypto-txn-history");
                }}
                sx={{
                  color: "#FFF",
                  backgroundColor: "#1E2959",
                  ml: "auto",
                  display: "block",
                }}
              >
                Txn History
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
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
                        "User address",
                        "Foreign ID",
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
                    {allCryptoTnxData
                      .map((item) => (
                        <TableRow
                          key={item.foreignID}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            background: "#FFFFFF",
                            boxShadow: "0px 4px 4px rgba(210, 207, 227, 0.25)",
                            borderRadius: "7px",
                            // marginBottom: "2px",
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
                            {item.user_address}
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
                            {item.foreignID}
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
                            {item.crypto_coin}
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
                            {item.fiat_coin}
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
                            {item.amount}
                          </TableCell>
                        </TableRow>
                      ))
                      .slice(1, allCryptoTnxData.length)}
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <TextField
                          sx={{
                            border: "1px solid #C3C3C3",
                            borderRadius: "6px",
                          }}
                          size="small"
                          type="text"
                          name="user_address"
                          onChange={(e) => handleInputChange(e)}
                          value={cryptoTnxData.user_address}
                          fullWidth
                          placeholder="User address"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          sx={{
                            border: "1px solid #C3C3C3",
                            borderRadius: "6px",
                          }}
                          size="small"
                          type="text"
                          name="foreignID"
                          onChange={(e) => handleInputChange(e)}
                          value={cryptoTnxData.foreignID}
                          fullWidth
                          placeholder="Foreign ID"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          sx={{
                            border: "1px solid #C3C3C3",
                            borderRadius: "6px",
                          }}
                          size="small"
                          type="text"
                          name="crypto_coin"
                          onChange={(e) => handleInputChange(e)}
                          value={cryptoTnxData.crypto_coin}
                          fullWidth
                          placeholder="Crypto Coin"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          sx={{
                            border: "1px solid #C3C3C3",
                            borderRadius: "6px",
                          }}
                          size="small"
                          type="text"
                          name="fiat_coin"
                          onChange={(e) => handleInputChange(e)}
                          value={cryptoTnxData.fiat_coin}
                          fullWidth
                          placeholder="Flat Coin"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          sx={{
                            border: "1px solid #C3C3C3",
                            borderRadius: "6px",
                          }}
                          type="number"
                          size="small"
                          name="amount"
                          onChange={(e) => handleInputChange(e)}
                          value={cryptoTnxData.amount}
                          fullWidth
                          placeholder="Amount"
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} lg={12} mt={3}>
              <Stack
                direction="row"
                spacing={2}
                // sx={{
                //   backgroundColor: "#f9fafe",
                //   borderTop: "2px solid red",
                //   position: "fixed",
                //   width: "100%",
                //   bottom: "0",
                //   color: "white",
                //   fontSize: "25px",
                // }}
              >
                <div>
                  <Button
                    variant="contained"
                    onClick={insertTransaction}
                    style={{ color: "#FFF", backgroundColor: "#1E2959" }}
                  >
                    Add <AddIcon />
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    style={{ color: "#FFF", backgroundColor: "#1E2959" }}
                  >
                    <label className="" htmlFor="excel">
                      upload{" "}
                    </label>
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    style={{ color: "#FFF", backgroundColor: "#1E2959" }}
                  >
                    Submit Details
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="success"
                    style={{ color: "#FFF", backgroundColor: "#1E2959" }}
                  >
                    <a
                      style={{ color: "#fff" }}
                      href="https://res.cloudinary.com/diwqlosrk/raw/upload/v1675236890/dummy-transaction_feeviz_unelwu.xlsx"
                    >
                      Download Dummy Excel file
                    </a>
                  </Button>
                </div>
              </Stack>
              <input
                type="file"
                style={{
                  display: "none",
                }}
                id="excel"
                onChange={(e) => {
                  let { files } = e.target;
                  const selectedFiles = files as FileList;
                  readExcel(selectedFiles?.[0]);
                  e.target.value = "";
                }}
              />
            </Grid>
          </Grid>
        </Stack>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loaderOpen}
          onClick={() => {}}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <SnackBar
          open={openSnack}
          message={message}
          setOpen={setOpenSnack}
          severity={severity}
        />
      </Box>
      <Footer />
    </Box>
  );
};

export default CryptoTnx;

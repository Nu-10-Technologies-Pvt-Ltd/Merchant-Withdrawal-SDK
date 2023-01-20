import React, { useState, ChangeEventHandler } from 'react'
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
const CryptoTnx = () => {
    // State declarations  -------------
    const [allCryptoTnxData, setAllCryptoTnxData] = useState([{
        user_address: "",
        foreignID: "",
        crypto_coin: "",
        flat_coin: "",
        amount: 0,
    }])
    const [cryptoTnxData, setCryptoTnxData] = useState({
        user_address: "",
        foreignID: "",
        crypto_coin: "",
        flat_coin: "",
        amount: 0,
    });

    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    // functions declarations ------------
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setCryptoTnxData((preValue) => ({
            ...preValue,
            [name]: value
        }));
    }
    const insetTransaction = async () => {
        console.log('function is calling...');
        console.log("these is tnx Data", cryptoTnxData)
        if (cryptoTnxData.user_address === "" || cryptoTnxData.amount === 0 || cryptoTnxData.crypto_coin === "" || cryptoTnxData.foreignID === "" || cryptoTnxData.flat_coin === "") {
            setMessage("Please add all the fields")
            setOpen(true)
        } else {
            setOpen(false)
            setAllCryptoTnxData([...allCryptoTnxData, cryptoTnxData]);
            setCryptoTnxData({
                user_address: "",
                foreignID: "",
                crypto_coin: "",
                flat_coin: "",
                amount: 0,
            })
            console.log(allCryptoTnxData)
        }
    }

    // const handleSubmit = () => {
    //     navigate("/crypto-transaction-history", {
    //         state: allCryptoTnxData
    //     })
    // }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const readExcel = (file: any) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file)
            fileReader.onload = (e) => {
                const bufferArray = e.target?.result;
                const wb = XLSX.read(bufferArray, { type: "buffer" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws)
                resolve(data)
            }
            fileReader.onerror = error => {
                reject(error)
            }
        });
        promise.then((d: any) => {
            setAllCryptoTnxData(d)
        })
    }
    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <Container sx={{ mt: 5 }}>
            <Stack direction={"row"} sx={{ alignItems: "center", minHeight: "70vh" }}>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={message}
                    action={action}
                />
                <Grid container >
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>User address</TableCell>
                                        <TableCell align="left">Foreign ID</TableCell>
                                        <TableCell align="left">Flat Coin</TableCell>
                                        <TableCell align="left">Crypto Coin</TableCell>
                                        <TableCell align="left">Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allCryptoTnxData.map(item => (
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <TextField disabled={true} sx={{
                                                    border: "1px solid #C3C3C3",
                                                    borderRadius: "6px"
                                                }} size='small' type="text" name='user_address' onChange={(e) => handleInputChange(e)} value={item.user_address} fullWidth placeholder='User address' variant="outlined" />
                                            </TableCell>
                                            <TableCell align="right">
                                                <TextField disabled={true} sx={{
                                                    border: "1px solid #C3C3C3",
                                                    borderRadius: "6px"
                                                }} size='small' type="text" name='foreignID' onChange={(e) => handleInputChange(e)} value={item.foreignID} fullWidth placeholder="Foreign ID" variant="outlined" />
                                            </TableCell>
                                            <TableCell align="right">
                                                <TextField disabled={true} sx={{
                                                    border: "1px solid #C3C3C3",
                                                    borderRadius: "6px"
                                                }} size='small' type="text" name='crypto_coin' onChange={(e) => handleInputChange(e)} value={item.crypto_coin} fullWidth placeholder="Crypto Coin" variant="outlined" />
                                            </TableCell>
                                            <TableCell align="right">
                                                <TextField disabled={true} sx={{
                                                    border: "1px solid #C3C3C3",
                                                    borderRadius: "6px"
                                                }} size='small' type="text" name='flat_coin' onChange={(e) => handleInputChange(e)} value={item.flat_coin} fullWidth placeholder="Flat Coin" variant="outlined" />
                                            </TableCell>
                                            <TableCell align="right">
                                                <TextField disabled={true} sx={{
                                                    border: "1px solid #C3C3C3",
                                                    borderRadius: "6px"
                                                }} type="number" size='small' name='amount' onChange={(e) => handleInputChange(e)} value={item.amount} fullWidth placeholder="Amount" variant="outlined" />
                                            </TableCell>
                                        </TableRow>
                                    )).slice(1, allCryptoTnxData.length)}
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <TextField sx={{
                                                border: "1px solid #C3C3C3",
                                                borderRadius: "6px"
                                            }} size='small' type="text" name='user_address' onChange={(e) => handleInputChange(e)} value={cryptoTnxData.user_address} fullWidth placeholder='User address' variant="outlined" />
                                        </TableCell>
                                        <TableCell align="right">
                                            <TextField sx={{
                                                border: "1px solid #C3C3C3",
                                                borderRadius: "6px"
                                            }} size='small' type="text" name='foreignID' onChange={(e) => handleInputChange(e)} value={cryptoTnxData.foreignID} fullWidth placeholder="Foreign ID" variant="outlined" />
                                        </TableCell>
                                        <TableCell align="right">
                                            <TextField sx={{
                                                border: "1px solid #C3C3C3",
                                                borderRadius: "6px"
                                            }} size='small' type="text" name='crypto_coin' onChange={(e) => handleInputChange(e)} value={cryptoTnxData.crypto_coin} fullWidth placeholder="Crypto Coin" variant="outlined" />
                                        </TableCell>
                                        <TableCell align="right">
                                            <TextField sx={{
                                                border: "1px solid #C3C3C3",
                                                borderRadius: "6px"
                                            }} size='small' type="text" name='flat_coin' onChange={(e) => handleInputChange(e)} value={cryptoTnxData.flat_coin} fullWidth placeholder="Flat Coin" variant="outlined" />
                                        </TableCell>
                                        <TableCell align="right">
                                            <TextField sx={{
                                                border: "1px solid #C3C3C3",
                                                borderRadius: "6px"
                                            }} type="number" size='small' name='amount' onChange={(e) => handleInputChange(e)} value={cryptoTnxData.amount} fullWidth placeholder="Amount" variant="outlined" />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12} lg={12} mt={3}>
                        <Stack direction='row' spacing={2}>
                            <div>
                                <Button variant='contained' onClick={() => insetTransaction()}>Add <AddIcon /></Button>
                            </div>
                            <div>
                                <Button variant='contained' >
                                    <label className='' htmlFor="excel">upload </label>
                                </Button>
                            </div>
                            <div>
                                <Button variant='contained' onClick={() => {
                                    if (allCryptoTnxData.length > 1) {
                                        navigate("/approval", { state: allCryptoTnxData })
                                    } else {
                                        setMessage("Please Add at least one entry ")
                                        setOpen(true)
                                    }
                                }
                                } >
                                    Submit Details
                                </Button>
                            </div>
                            <div>
                                <Button variant='contained' color='success'>
                                    <a style={{ color: "#fff" }} href='https://res.cloudinary.com/dlvgerrwj/raw/upload/v1674139804/dummy-transaction_feeviz.xlsx' >
                                        Download Dummy Excel file
                                    </a>
                                </Button>

                            </div>
                        </Stack>
                        <input type="file" style={{
                            display: "none"
                        }} id="excel" onChange={e => {
                            const { files } = e.target;
                            const selectedFiles = files as FileList;
                            readExcel(selectedFiles?.[0])
                        }} />
                    </Grid>
                </Grid>
            </Stack>
        </Container >
    )
}

export default CryptoTnx
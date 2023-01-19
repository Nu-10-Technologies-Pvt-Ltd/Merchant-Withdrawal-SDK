import React, { useState } from 'react'
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
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

    const [open, setOpen] = React.useState(false);

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
            setOpen(true)
        } else {
            setOpen(false)
            setAllCryptoTnxData([...allCryptoTnxData, cryptoTnxData]);
            console.log(allCryptoTnxData)
        }
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
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
                    message="Note archived"
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
                        <Button variant='contained' onClick={() => insetTransaction()}>Add <AddIcon /></Button>
                    </Grid>
                </Grid>
                {/* <Grid container spacing={2} >
                    <Grid item xs={12} lg={6}>
                        <TextField size='small' type="text" name='user_address' onChange={(e) => handleInputChange(e)} value={cryptoTnxData.user_address} fullWidth label="User Address" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField size='small' type="text" name='foreignID' onChange={(e) => handleInputChange(e)} value={cryptoTnxData.foreignID} fullWidth label="Foreign ID" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField size='small' type="text" name='crypto_coin' onChange={(e) => handleInputChange(e)} value={cryptoTnxData.crypto_coin} fullWidth label="Crypto Coin" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField size='small' type="text" name='flat_coin' onChange={(e) => handleInputChange(e)} value={cryptoTnxData.flat_coin} fullWidth label="Flat Coin" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField type="number" size='small' name='amount' onChange={(e) => handleInputChange(e)} value={cryptoTnxData.amount} fullWidth label="Amount" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <Button variant='contained' onClick={() => insetTransaction()}>Add <AddIcon /></Button>
                    </Grid>
                </Grid> */}
            </Stack>
        </Container >
    )
}


export default CryptoTnx
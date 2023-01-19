import React from 'react'
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const CryptoTnxHistory = (props: any) => {
    const { allCryptoTnxData } = props;
    return (
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
                    {allCryptoTnxData.map((row: any, i: number) => (
                        <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.user_address}
                            </TableCell>
                            <TableCell align="right">
                                {row.foreignID}
                            </TableCell>
                            <TableCell align="right">
                                {row.crypto_coin}
                            </TableCell>
                            <TableCell align="right">
                                {row.flat_coin}
                            </TableCell>
                            <TableCell align="right">
                                {row.amount}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CryptoTnxHistory
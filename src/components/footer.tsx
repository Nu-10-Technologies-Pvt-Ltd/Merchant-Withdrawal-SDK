import { Box, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#f9fafe",
        // borderTop: "2px solid red",
        position: "fixed",
        width: "100%",
        bottom: "0",
        color: "white",
        fontSize: "25px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "4%",
      }}
    >
      <Typography
        sx={{
          fontWeight: "400",
          fontSize: "12px",
          lineHeight: "15px",
          color: "#21146B",
        }}
      >
        Powered by Nivapay
      </Typography>
    </Box>
  );
}

export default Footer;

import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function App() {
  const [qr, setQr] = useState("");
  const [regNo, setRegNo] = useState("BEV-6440");
  const [vehiType, setVehiType] = useState("Bike");

  // this funtion will generate QR
  const printQRCode = () => {
    const qrCodeURL1 = document.getElementById("qrCodeEl") as HTMLCanvasElement;

    const qrCodeURL = qrCodeURL1
      ?.toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    setQr(qrCodeURL);
    generatePdf(qrCodeURL);
  };

  // this funtion will generate PDF with QR
  const generatePdf = (qrCodeURL: string) => {
    var doc = new jsPDF("landscape", "mm", "a4");
    doc.addImage(qrCodeURL, "JPEG", 145, 35, 110, 110);
    doc.text("Reg. No. : " + regNo, 20, 55);
    doc.text("Vehi. Type  : " + vehiType, 20, 75);
    doc.save("qr.pdf");
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              label="Reg. No."
              onChange={(e) => setRegNo(e.target.value)}
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Vehi. Type"
              onChange={(e) => setVehiType(e.target.value)}
              variant="standard"
            />
          </Box>
          <Button onClick={() => printQRCode()} variant="contained">
            Print QR Label
          </Button>
        </Grid>
        <Grid mt={5} item xs={3}>
          <img src={qr} alt="QR"></img>
        </Grid>
      </Grid>
      <Grid style={{ display: "none" }}>
        <QRCode
          id="qrCodeEl"
          size={200}
          value={`
                {
                  "RegNo": "${regNo}
                   ",
                  "vehiType": "${vehiType}
                   ",
                }`}
        />
      </Grid>
    </>
  );
}

export default App;

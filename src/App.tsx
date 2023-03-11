import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

function App() {
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
          <Button variant="contained">Print QR Label</Button>
        </Grid>
      </Grid>
    </>
  );
}

export default App;

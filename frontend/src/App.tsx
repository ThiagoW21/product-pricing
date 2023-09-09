import "./App.css";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "./components/Button";
import ProductsTable from "./components/ProductsTable";
import LoadCSV from "./components/LoadCSV";
import { useState } from "react";
import { validateCsvData, updateProductsPrices } from "./services";
import { IProduct, ISnackbar } from "./interfaces";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarMessages } from "./helpers/enums";
import Alert from "@mui/material/Alert";
import Delete from "@mui/icons-material/Delete";

function App() {
  const [csvData, setCsvData] = useState<Array<Object>>([]);
  const [csvIsValid, setCsvIsValid] = useState<boolean>(true);
  const [rows, setRows] = useState<Array<IProduct>>([]);
  const [snackbarData, setSnackbarData] = useState<ISnackbar>({
    show: false,
    message: "",
    color: "success",
  });

  function checkProducts(data: Array<IProduct>) {
    const hasError = data.some(({ is_valid }) => !is_valid);
    setCsvIsValid(!hasError);
  }

  async function validateCsv() {
    await validateCsvData(csvData)
      .then(({ data }) => {
        setRows(data);
        checkProducts(data);
        setSnackbarData({
          color: "success",
          message: SnackbarMessages.ValidationSuccess,
          show: true,
        });
      })
      .catch(() => {
        setSnackbarData({
          color: "error",
          message: SnackbarMessages.ValidationFailure,
          show: true,
        });
      });
  }

  function resetData() {
    setCsvData([]);
    setRows([]);
    setCsvIsValid(false);
  }

  async function updateProducts() {
    await updateProductsPrices(csvData)
      .then(() => {
        setSnackbarData({
          color: "success",
          message: SnackbarMessages.UpdateSuccess,
          show: true,
        });
      })
      .catch(() => {
        setSnackbarData({
          color: "error",
          message: SnackbarMessages.UpdateFailure,
          show: true,
        });
      });

    resetData();
  }

  const handleCloseSnackbar = () => {
    setSnackbarData({ ...snackbarData, show: false });
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Card
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            height: 700,
            paddingX: 2,
            borderRadius: 4,
          }}
        >
          <CardContent>
            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid container item xs={20} md={4}>
                <img width={250} src="/shopper_logo.png" alt="logo" />
              </Grid>

              {!csvData.length ? (
                <>
                  <Grid container item xs={13} md={4} sx={{ mt: 1 }}>
                    <LoadCSV
                      change={(data: Array<Object>) => setCsvData(data)}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid container item xs={20} md={3} sx={{ mt: 1 }}>
                    <Button
                      text="Remover arquivo"
                      variant="text"
                      color="error"
                      onClick={resetData}
                      startIcon={<Delete />}
                    />
                  </Grid>
                  <Grid container item xs={20} md={2} sx={{ mt: 1 }}>
                    <Button
                      text="Validar"
                      variant="outlined"
                      onClick={validateCsv}
                    />
                  </Grid>
                  <Grid container item xs={13} md={3} sx={{ mt: 1 }}>
                    <Button
                      text="Atualizar"
                      color="primary"
                      variant="contained"
                      textColor="white"
                      disabled={!csvIsValid}
                      onClick={updateProducts}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </CardContent>
          <ProductsTable rows={rows} />
        </Card>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarData.show}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarData.color}
          sx={{ width: "100%" }}
        >
          {snackbarData.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;

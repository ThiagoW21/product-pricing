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
import { IProduct } from "./interfaces";

function App() {
  const [csvData, setCsvData] = useState<Array<Object>>([]);
  const [csvIsValid, setCsvIsValid] = useState<boolean>(true);
  const [rows, setRows] = useState<Array<IProduct>>([]);

  function checkProducts(res: Array<IProduct>) {
    const hasError = res.some(({ is_valid }) => !is_valid);
    setCsvIsValid(hasError);
  }

  async function validateCsv() {
    const response = await validateCsvData(csvData);
    setRows(response);

    checkProducts(response);
  }

  async function updateProducts() {
    await updateProductsPrices(csvData);

    setCsvIsValid(false);
    setCsvData([]);
    setRows([]);
  }

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
              <Grid container item xs={20} md={6}>
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
                      disabled={csvIsValid}
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
    </Container>
  );
}

export default App;

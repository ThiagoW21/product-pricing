import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FunctionComponent } from "react";
import { ITableProps, IProductMessage } from "../interfaces";

const productMessages: IProductMessage = {
  NEW_PRICE_BELOW_COST: "Novo valor de venda inferior ao preço do produto",
  PRICE_LIMIT_EXCEEDED: "Reajuste limitado a 10% em relação ao preço atual",
  NEW_PRICE_IS_VALID: "O novo preço é válido para reajuste",
};

const headers: Array<string> = [
  "Código",
  "Nome",
  "Preço de venda",
  "Novo preço",
  "Status",
  "Mensagem",
];

const ProductsTable: FunctionComponent<ITableProps> = ({ rows }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 500, mt: 5 }}
      variant="outlined"
    >
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.product_code}</TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.sales_price}</TableCell>
              <TableCell>{row.new_price}</TableCell>
              <TableCell>{row.is_valid ? "Válido" : "Inválido"}</TableCell>
              <TableCell>{productMessages[row.code]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;

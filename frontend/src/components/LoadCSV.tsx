import CSVReader from "react-csv-reader";
import { FunctionComponent } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "./Button";
import "./styles.css";

interface CSVProps {
  change: Function;
}

const LoadCSV: FunctionComponent<CSVProps> = ({ change }) => {
  function handleClick() {
    document.getElementById("csv-input")?.click();
  }

  return (
    <>
      <CSVReader
        onFileLoaded={(data) => change(data)}
        cssClass="csv-loader"
        inputId="csv-input"
        parserOptions={{
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        }}
      />
      <Button
        text="Carregar arquivo csv"
        color="primary"
        variant="contained"
        textColor="white"
        startIcon={<CloudUploadIcon />}
        onClick={handleClick}
      />
    </>
  );
};

export default LoadCSV;

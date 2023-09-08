import MuiButton from "@mui/material/Button";
import { FunctionComponent } from "react";
import { IButtonProps } from "../interfaces";

const Button: FunctionComponent<IButtonProps> = (props) => {
  return (
    <MuiButton
      variant={props.variant}
      color={props.color}
      startIcon={props.startIcon}
      onClick={props.onClick}
      disabled={props.disabled}
      sx={{
        width: "100%",
        height: 60,
        fontWeight: "bold",
        fontSize: 17,
        borderRadius: "20px",
        color: props.textColor,
      }}
    >
      {props.text}
    </MuiButton>
  );
};

export default Button;

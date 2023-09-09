import { ReactNode } from "react";

export interface IProduct {
  new_price: number;
  sales_price: number;
  name: string;
  code: string;
  product_code: number;
  is_valid: Boolean;
}

export interface ITableProps {
  rows: Array<IProduct>;
}

export interface IProductMessage {
  [key: string]: string;
}

export interface IButtonProps {
  text: string;
  color?: "primary" | "secondary" | "error";
  variant?: "outlined" | "contained" | "text";
  textColor?: string;
  onClick?: () => void;
  startIcon?: ReactNode;
  disabled?: boolean;
}

export interface ISnackbar {
  message: string,
  color: 'success' | 'error',
  show: boolean
}
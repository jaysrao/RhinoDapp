"use client";
import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const MuiTextField = styled(TextField)(({ theme }) => ({
  width: "550px",
  fontSize: 16,
  marginBottom: "30px",
  borderRadius: "0.5rem",
}));

export default function TextInput({ ...props }: TextFieldProps) {
  return (
    <MuiTextField
      InputProps={{ sx: { borderRadius: "0.5rem" } }}
      InputLabelProps={{
        shrink: true,
        style: { fontSize: "14px", fontWeight: "700", color: "#444" },
      }}
      sx={{ "& .Mui-disabled": { WebkitTextFillColor: "#bbb !important" } }}
      {...props}
    />
  );
}

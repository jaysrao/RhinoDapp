"use client";
import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const MuiButton = styled(Button)(({ theme }) => ({
  padding: "0.5rem 1.5rem",
  fontSize: 16,
  fontWeight: "bold",
  borderRadius: "0.5rem",
  textTransform: "none",
}));

export default function SubmitButton({ children, ...props }: ButtonProps) {
  return (
    <MuiButton variant="contained" {...props}>
      {children}
    </MuiButton>
  );
}

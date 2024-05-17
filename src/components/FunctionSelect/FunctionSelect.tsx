import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/material/styles";

interface FunctionSelectProps {
  value: string;
  onChange: (e: any) => void;
}

const MuiSelect = styled(Select)(({ theme }) => ({
  width: "550px",
  fontSize: 14,
  marginBottom: "30px",
  borderRadius: "0.5rem",
}));

export default function FunctionSelect({ value, onChange }: FunctionSelectProps) {
  return (
    <FormControl>
      <InputLabel sx={{fontSize: "14px", fontWeight: "700"}}>Function</InputLabel>
      <MuiSelect
        label="Function"
        placeholder="Select function"
        value={value}
        onChange={onChange}
      >
        <MenuItem value={"registerSender"} sx={{ color: "#277351" }}>
          Step 1: registerSender
        </MenuItem>
        <MenuItem value={"fullWithdrawalRequest"} sx={{ color: "#277351" }}>
          Step 2: fullWithdrawalRequest
        </MenuItem>
        <MenuItem value={"withdraw"} sx={{ color: "#277351" }}>
          Step 3: withdraw
        </MenuItem>
      </MuiSelect>
    </FormControl>
  );
}

"use client";
import { createTheme } from "@mui/material/styles";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });

const theme = createTheme({
  palette: {
    mode: "light",
    primary: createColor("#277351"),
  },
  typography: {
    fontSize: 12.25, // set the default font size by 14. (font size calculation: https://v3.mui.com/customization/themes/#typography)
  },
});

export default theme;

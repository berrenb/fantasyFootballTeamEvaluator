import { createTheme } from "@mui/material/styles";

export const createDynamicMuiTheme = (primary, secondary) => createTheme({
    palette: {
        type: "dark",
        success: {
            main: "#228B22"
        },
        error: {
            main: "#ff4750"
        },
        warning: {
            main: "#FFA500"
        },
        info: {
            main: "#3C81D2"
        },
        primary1: {
            main: "#D7CF07"
        },
        primary2: {
            main: "#D98324"
        },
        primary3: {
            main: "#A40606"
        },
        primary4: {
            main: "#5A0002"
        },
        primary5: {
            main: "#230007"
        }
    }
});
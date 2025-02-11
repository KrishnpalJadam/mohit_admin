// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    primaryBtn: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      border: `1px solid ${theme.palette.common.black}`,
      borderRadius: "5px",
      cursor: "pointer",
      padding: "10px 15px",
      transition: "all 300ms cubic-bezier(.23, 1, 0.32, 1)",
      userSelect: "none",
      WebkitUserSelect: "none",
      touchAction: "manipulation",
      willChange: "transform",
      "&:hover": {
        backgroundColor: theme.palette.common.black,
        boxShadow: "rgba(0, 0, 0, 0.25) 0 8px 15px",
        transform: "translateY(-2px)",
      },
      "&:active": { boxShadow: "none", transform: "translateY(0)" },
      "&:disabled": {
        pointerEvents: "none",
      },
    },
    secondaryBtn: {
      backgroundColor: "transparent",
      color: theme.palette.common.black,
      border: `1px solid ${theme.palette.common.black}`,
      borderRadius: "5px",
      cursor: "pointer",
      padding: "10px 15px",
      transition: "all 300ms cubic-bezier(.23, 1, 0.32, 1)",
      userSelect: "none",
      WebkitUserSelect: "none",
      touchAction: "manipulation",
      willChange: "transform",
      "&:hover": {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.black,
        border: `1px solid ${theme.palette.common.black}`,
        boxShadow: "rgba(0, 0, 0, 0.25) 0 8px 15px",
        transform: "translateY(-2px)",
      },
      "&:active": { boxShadow: "none", transform: "translateY(0)" },
      "&:disabled": {
        pointerEvents: "none",
      },
    },
    spinner: {
      display: "block",
      visibility: "visible !important",
      position: "absolute",
      width: "25px",
      height: "25px",
      borderRadius: "50%",
      border: `3px solid ${theme.palette.common.white}`,
      borderColor: `${theme.palette.common.white} transparent ${theme.palette.common.white} transparent`,
      animation: "loader 1s linear infinite",
      "@keyframes loader": {
        "0%": {
          transform: "rotate(0deg)",
        },
        "100%": {
          transform: "rotate(360deg)",
        },
      },
    },
    hideText: {
      "& > span": {
        visibility: "hidden",
      },
    },
    shakeBtn: {
      animation: "tilt-shaking 3s infinite",
      "@keyframes tilt-shaking": {
        "0%": {
          transform: "rotate(-5deg)",
        },
        "5%": {
          transform: "rotate(5deg)",
        },
        "10%": {
          transform: "rotate(-5deg)",
        },
        "15%": {
          transform: "rotate(5deg)",
        },
        "20%": {
          transform: "rotate(-5deg)",
        },
        "25%": {
          transform: "rotate(5deg)",
        },
        "30%": {
          transform: "rotate(0deg)",
        },
        "100%": {
          transform: "rotate(0deg)",
        },
      },
    },
  };
});

export default useStyles;

// ** Next, React And Locals Imports
import Link from "next/link";
import useStyles from "./styles.js";

// ** MUI Imports
import Button from "@mui/material/Button";

export default function PrimaryButton({
  href,
  text,
  startIcon,
  endIcon,
  animate,
  type,
  disabled,
  spinner,
  fullWidth,
  style,
  onClick,
}) {
  const { classes } = useStyles();

  return (
    <>
      {href ? (
        <Link href={href} passHref>
          <Button
            type={type}
            variant="contained"
            className={`${classes.primaryBtn} ${animate && classes.shakeBtn} ${
              spinner && classes.hideText
            }`}
            disableElevation
            disableRipple
            startIcon={startIcon}
            endIcon={endIcon}
            disabled={disabled}
            fullWidth={fullWidth}
            sx={style}
          >
            <span>{text}</span>
            <span className={spinner && classes.spinner}></span>
          </Button>
        </Link>
      ) : (
        <Button
          type={type}
          variant="contained"
          className={`${classes.primaryBtn} ${animate && classes.shakeBtn} ${
            spinner && classes.hideText
          }`}
          disableElevation
          disableRipple
          startIcon={startIcon}
          endIcon={endIcon}
          disabled={disabled}
          fullWidth={fullWidth}
          sx={style}
          onClick={onClick}
        >
          <span>{text}</span>
          <span className={spinner && classes.spinner}></span>
        </Button>
      )}
    </>
  );
}

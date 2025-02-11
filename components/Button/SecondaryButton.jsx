// ** Next, React And Locals Imports
import Link from "next/link";
import useStyles from "./styles.js";

// ** MUI Imports
import Button from "@mui/material/Button";

export default function SecondaryButton({
  type,
  href,
  text,
  startIcon,
  endIcon,
  fullWidth,
  target,
  style,
  onClick,
}) {
  const { classes } = useStyles();

  return (
    <>
      {href ? (
        <Link href={href} target={target ? target : "_self"} passHref>
          <Button
            type={type}
            variant="outlined"
            className={classes.secondaryBtn}
            disableElevation
            disableRipple
            startIcon={startIcon}
            endIcon={endIcon}
            fullWidth={fullWidth}
            sx={style}
          >
            {text}
          </Button>
        </Link>
      ) : (
        <Button
          type={type}
          variant="outlined"
          className={classes.secondaryBtn}
          disableElevation
          disableRipple
          startIcon={startIcon}
          endIcon={endIcon}
          fullWidth={fullWidth}
          sx={style}
          onClick={onClick}
        >
          {text}
        </Button>
      )}
    </>
  );
}

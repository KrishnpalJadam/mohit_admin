// ** Next, React And Locals Imports
import Image from "next/image";
import useStyles from "./styles.js";

export default function CustomImage({
  src,
  alt,
  width,
  height,
  style,
  fill,
  priority,
}) {
  const { classes } = useStyles();

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={`${classes.fillImage} ${style ? style : ""}`}
        priority={priority}
      />
    );
  } else {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={style ? style : ""}
        priority={priority}
      />
    );
  }
}

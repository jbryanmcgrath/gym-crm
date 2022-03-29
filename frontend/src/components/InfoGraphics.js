import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageCard from "./ImageCard";
import places from "../static/sellingPoints";
import useWindowPosition from "../hook/useWindowPosition";
import sellingPoints from "../static/sellingPoints";
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
}));
export default function () {
  const classes = useStyles();
  const checked = useWindowPosition("header");
  return (
    <div className={classes.root} id="info-graphics">
      <ImageCard place={sellingPoints[0]} checked={checked} />
      <ImageCard place={sellingPoints[1]} checked={checked} />
      <ImageCard place={sellingPoints[2]} checked={checked} />
    </div>
  );
}

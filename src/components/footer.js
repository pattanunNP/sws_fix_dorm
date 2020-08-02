import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "Kanit",
    justifyContent: "center",
  },
  footer: {
    width: "auto",
    padding: "45px",
    background: "rgba(50,50,50,1)",
  },
  title: {
    fontFamily: "Kanit",
    flexGrow: 1,
  },

  text: {
    color: "#FFFFFF",
    padding: "10px",
    fontFamily: "Kanit",
  },
}));
function Footer() {
  const classes = useStyles();
  return (
    <div className="App">
      <Card className={classes.footer}>
        <Grid>
          <Typography>
            <a href="https://github.com/pattanunNP" className={classes.text}>
              Copyright © 2020 All Right Revesed By pattanunNP
            </a>
          </Typography>
        </Grid>
      </Card>
    </div>
  );
}

export default Footer;

import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import { useLabel } from "../../label";

function TopBar() {
  const { state } = useLabel();
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar className="toolbar">
        <Typography variant="h5" color="inherit">
          Nguyen Huu Hieu
        </Typography>
        <Link to="/">
          <Typography variant="h5" color="inherit">
            Home
          </Typography>
        </Link>
        <Typography variant="h5" color="inherit">
          {state}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

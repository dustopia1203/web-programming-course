import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import "./styles.css";
import { useVariable } from "../../globalVariables";

function TopBar() {
  const { state, isAuthenticated, setIsAuthenticated } = useVariable();
  const handleLogOut = async () => {
    try {
      await fetch("http://localhost:8081/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("user");
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar className="toolbar">
        <Typography variant="h5" color="inherit">
          Nguyen Huu Hieu
        </Typography>
        <Typography variant="h5" color="inherit">
          {state}
        </Typography>
        {isAuthenticated ? (
          <Button color="inherit" variant="outlined" onClick={handleLogOut}>
            Logout
          </Button>
        ) : (
          <Typography variant="h5" color="inherit">
            Please Login
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

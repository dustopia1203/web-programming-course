import "./App.css";

import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

const App = (props) => {
  const [state, setState] = useState("Home");
  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar state={state} />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList />
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/" element={<HomePage setState={setState} />} />
                <Route
                  path="/users/:userId"
                  element={<UserDetail setState={setState} />}
                />
                <Route
                  path="/photos/:userId"
                  element={<UserPhotos setState={setState} />}
                />
                <Route path="/users" element={<UserList />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;

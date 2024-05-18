import "./App.css";

import React from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./components/HomePage";
import LoginRegister from "./components/LoginRegister";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import UserComments from "./components/UserComments";
import { useVariable } from "./globalVariables";

const App = (props) => {
  const { state } = useVariable();
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
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item" elevation={0}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login-register" element={<LoginRegister />} />
                <Route
                  path="/users/:userId"
                  element={
                    <ProtectedRoute>
                      <UserDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/photos/:userId"
                  element={
                    <ProtectedRoute>
                      <UserPhotos />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/comments/:userId"
                  element={
                    <ProtectedRoute>
                      <UserComments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute>
                      <UserList />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;

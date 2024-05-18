import { Grid, FormControl, Input, InputLabel, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useVariable } from "../../globalVariables";
import { useNavigate } from "react-router-dom";

function LoginRegister() {
  const navigate = useNavigate();
  const { setState, isAuthenticated, setIsAuthenticated } = useVariable();
  const [toggleRegister, setToggleRegister] = useState(false);
  const [message, setMessage] = useState("");
  const [messageReg, setMessageReg] = useState("");
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [loginNameReg, setLoginNameReg] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [description, setDescription] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  useEffect(() => {
    if (isAuthenticated) navigate("/");
    setState("Login/Register");
  }, []);
  const handleToggleRegister = () => {
    setToggleRegister(!toggleRegister);
  };
  const handleMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };
  const handleMessageReg = (msg) => {
    setMessageReg(msg);
    setTimeout(() => setMessageReg(""), 2000);
  };
  const handleLogin = () => {
    const data = { login_name: loginName, password: password };
    fetch("http://localhost:8081/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          handleMessage("Login successful");
          return res.json();
        } else if (res.status === 404) {
          handleMessage("Not valid login information");
        } else if (res.status === 400) {
          handleMessage("Missing login information");
        }
      })
      .then((data) => {
        if (!data) return;
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsAuthenticated(true);
        navigate("/");
      })
      .catch((error) => {
        handleMessage(error.message);
      });
    setLoginName("");
    setPassword("");
  };
  const handleRegister = () => {
    if (passwordReg !== confirmPass) {
      handleMessageReg("Passwords do not match");
      return;
    }
    const data = {
      first_name: firstName,
      last_name: lastName,
      login_name: loginNameReg,
      password: passwordReg,
      location: location,
      description: description,
      occupation: occupation,
    };
    fetch("http://localhost:8081/api/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          handleMessageReg("User created");
          setTimeout(() => setToggleRegister(false), 2000);
          setLoginNameReg("");
          setFirstName("");
          setLastName("");
          setLocation("");
          setOccupation("");
          setDescription("");
          setPasswordReg("");
          setConfirmPass("");
        } else if (res.status === 401) {
          handleMessageReg("User already exists");
        } else if (res.status === 400) {
          handleMessageReg("Missing registration information");
        }
      })
      .catch((error) => {
        handleMessageReg(error.message);
      });
  };
  return (
    <>
      {message && <div>{message}</div>}
      <Grid container spacing={2}>
        <Grid item container xs={12} spacing={3} style={{ height: "50%" }}>
          <Grid item xs={12}>
            <FormControl variant="standard" sx={{ width: "60%" }}>
              <InputLabel htmlFor="login-name">Login Name</InputLabel>
              <Input
                id="login-name"
                name="login-name"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="standard" sx={{ width: "60%" }}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              component="button"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              component="button"
              onClick={handleToggleRegister}
            >
              Register
            </Button>
          </Grid>
        </Grid>
        {toggleRegister && (
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
              <FormControl variant="standard" sx={{ width: "30%" }}>
                <InputLabel htmlFor="login_name">Login Name</InputLabel>
                <Input
                  id="login_name"
                  name="login_name"
                  value={loginNameReg}
                  onChange={(e) => setLoginNameReg(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="standard" sx={{ width: "30%" }}>
                <InputLabel htmlFor="first_name">First Name</InputLabel>
                <Input
                  id="first_name"
                  name="first_name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="standard" sx={{ width: "30%" }}>
                <InputLabel htmlFor="last_name">Last Name</InputLabel>
                <Input
                  id="last_name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="standard" sx={{ width: "30%" }}>
                <InputLabel htmlFor="location">Location</InputLabel>
                <Input
                  id="location"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="standard" sx={{ width: "30%" }}>
                <InputLabel htmlFor="occupation">Occupation</InputLabel>
                <Input
                  id="occupation"
                  name="occupation"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="standard" sx={{ width: "30%" }}>
                <InputLabel htmlFor="description">Description</InputLabel>
                <Input
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="standard" sx={{ width: "30%" }}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={passwordReg}
                  onChange={(e) => setPasswordReg(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="standard" sx={{ width: "30%" }}>
                <InputLabel htmlFor="confirm_pass">Confirm Password</InputLabel>
                <Input
                  id="confirm_pass"
                  name="confirm_pass"
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
              </FormControl>
            </Grid>
            {messageReg && <div>{messageReg}</div>}
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="button"
                onClick={handleRegister}
              >
                Register Me
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default LoginRegister;

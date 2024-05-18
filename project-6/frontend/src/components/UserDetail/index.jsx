import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import { useVariable } from "../../globalVariables";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";

function UserDetail() {
  const { setState } = useVariable();
  const user = useParams();
  const [data, setData] = useState({});
  const [dialog, setDialog] = useState(false);
  const [uploadInput, setUploadInput] = useState(null);
  const userData = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const getData = async () => {
      const data = await fetchModel(`/api/user/${user.userId}`);
      setData(data[0]);
      setState(data[0]?.first_name + "'s information");
    };
    getData();
  }, [setState, user.userId]);
  const handleUpload = async (e) => {
    e.preventDefault();
    console.log(uploadInput.files[0]);
    if (uploadInput.files.length > 0) {
      const domForm = new FormData();
      domForm.append("file", uploadInput.files[0]);
      const result = await axios.post(
        "http://localhost:8081/api/photos/new",
        domForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(result.data);
      setDialog(false);
    }
  };
  return (
    <>
      <h1>{data.first_name}'s profile</h1>
      {userData?._id === user.userId ? (
        <Button
          color="inherit"
          variant="outlined"
          style={{ marginRight: "10px" }}
          onClick={() => setDialog(true)}
        >
          Upload
        </Button>
      ) : null}
      <Dialog open={dialog} onClose={() => setDialog(false)}>
        <form onSubmit={handleUpload}>
          <DialogContent>
            <input
              type={"file"}
              accept="image/*"
              ref={(domFileRef) => {
                setUploadInput(domFileRef);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">upload</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Card>
        <CardContent>
          <List>
            <ListItem>
              <ListItemText primary="First Name" secondary={data.first_name} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Last Name" secondary={data.last_name} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Location" secondary={data.location} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Description"
                secondary={data.description}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Occupation" secondary={data.occupation} />
            </ListItem>
            <Divider />
          </List>
        </CardContent>
        <CardActions>
          <Link to={`/photos/${user.userId}`}>
            <Button variant="contained" size="large">
              {data.first_name}'s photos
            </Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
}

export default UserDetail;

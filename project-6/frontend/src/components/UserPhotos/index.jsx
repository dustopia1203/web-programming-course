import React, { useState, useEffect } from "react";
import "./styles.css";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Divider,
  Checkbox,
  FormControlLabel,
  Stack,
  Pagination,
  TextField,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import { useVariable } from "../../globalVariables";
import { Link } from "react-router-dom";

function UserPhotos() {
  const { setState } = useVariable();
  const user = useParams();
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState({});
  const [photos, setPhotos] = useState([]);
  const [advancedMode, setAdvancedMode] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const data1 = await fetchModel(`/api/user/${user.userId}`);
      setData(data1[0]);
      const data2 = await fetchModel(`/api/photosOfUser/${user.userId}`);
      setPhotos(data2);
    };
    getData();
    if (data.first_name) {
      setState("Photos of " + data.first_name);
    }
  }, [data.first_name, setState, user.userId, toggle]);
  return (
    <div>
      <Grid
        container
        justifyContent="space-evenly"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item xs={12}>
          <h1>{data.first_name}'s photos</h1>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            label="Advanced mode"
            control={
              <Checkbox
                checked={advancedMode}
                onChange={() => setAdvancedMode(!advancedMode)}
              />
            }
          />
        </Grid>
        {photos.length > 0 ? (
          !advancedMode ? (
            <NormalMode photos={photos} toggle={toggle} setToggle={setToggle} />
          ) : (
            <AdvancedMode
              photos={photos}
              toggle={toggle}
              setToggle={setToggle}
            />
          )
        ) : null}
      </Grid>
    </div>
  );
}

function Comment({ photoId, toggle, setToggle }) {
  const [comment, setComment] = useState("");
  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    await fetch(`http://localhost:8081/api/commentsOfPhoto/${photoId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user._id,
        comment: comment,
      }),
    });
    setToggle(!toggle);
    setComment("");
  };
  return (
    <>
      <TextField
        label="Comment"
        variant="outlined"
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
}

function NormalMode({ photos, toggle, setToggle }) {
  return (
    <>
      {photos.map((photo) => (
        <Grid item xs={12} key={photo._id}>
          <Card variant="outlined">
            <Typography gutterBottom>{photo.date_time}</Typography>
            <CardContent>
              <CardMedia
                component="img"
                src={`http://localhost:8081/images/${photo.file_name}`}
              />
              <List>
                {photo.comments
                  ? photo.comments.map((comment) => (
                      <ListItem key="comment._id">
                        <Typography>
                          <Link
                            to={`/users/${comment.user._id}`}
                            style={{ marginRight: "10px" }}
                          >
                            <Typography variant="body1">
                              {comment.user.first_name +
                                " " +
                                comment.user.last_name}
                            </Typography>
                          </Link>
                          <Typography variant="caption">
                            {comment.date_time}
                          </Typography>
                          <Typography variant="body2">
                            {comment.comment}
                          </Typography>
                        </Typography>
                        <Divider />
                      </ListItem>
                    ))
                  : null}
              </List>
              <Comment
                photoId={photo._id}
                toggle={toggle}
                setToggle={setToggle}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
}

function AdvancedMode({ photos, toggle, setToggle }) {
  const [page, setPage] = useState(1);
  const [photo, setPhoto] = useState(photos[0]);
  useEffect(() => {
    setPhoto(photos[page - 1]);
  }, [page]);
  return (
    <>
      <Stack spacing={2}>
        <Pagination
          count={photos.length}
          page={page}
          onChange={(event, value) => {
            console.log(value);
            setPage(value);
          }}
        />
        <Grid item xs={12} key={photo._id}>
          <Card variant="outlined">
            <Typography gutterBottom>{photo.date_time}</Typography>
            <CardContent>
              <CardMedia
                component="img"
                src={`http://localhost:8081/images/${photo.file_name}`}
              />
              <List>
                {photo.comments
                  ? photo.comments.map((comment) => (
                      <ListItem key="comment._id">
                        <Typography>
                          <Link
                            to={`/users/${comment.user._id}`}
                            style={{ marginRight: "10px" }}
                          >
                            <Typography variant="body1" component="span">
                              {comment.user.first_name +
                                " " +
                                comment.user.last_name}
                            </Typography>
                          </Link>
                          <Typography variant="caption">
                            {comment.date_time}
                          </Typography>
                          <Typography variant="body2">
                            {comment.comment}
                          </Typography>
                        </Typography>
                        <Divider />
                      </ListItem>
                    ))
                  : null}
              </List>
              <Comment
                photoId={photo._id}
                toggle={toggle}
                setToggle={setToggle}
              />
            </CardContent>
          </Card>
        </Grid>
      </Stack>
    </>
  );
}

export default UserPhotos;

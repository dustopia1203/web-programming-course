import React, { useState, useEffect } from "react";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";
import { useNavigate } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchModel("/api/user/list");
      setUsers(data);
    };
    getData();
  }, []);
  return (
    <>
      <List component="nav">
        {users.map((item) => (
          <div key={item._id}>
            <Link to={`/users/${item._id}`}>
              <ListItem>
                <ListItemText primary={item.first_name} />
              </ListItem>
            </Link>
            <BubbleCount user_id={item._id} />
            <Divider />
          </div>
        ))}
      </List>
    </>
  );
}

function BubbleCount({ user_id }) {
  const [photos, setPhotos] = useState(0);
  const [comments, setComments] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const photos = await fetchModel(`/api/photosOfUser/${user_id}`);
      setPhotos(photos.length);
      const comments = await fetchModel(`/api/user/comments/${user_id}`);
      setComments(comments.length);
    };
    getData();
  }, []);
  const handleClick = () => {
    navigate("/comments/" + user_id);
  };
  return (
    <div className="container">
      <div className="photos">{photos}</div>
      <div className="comments" onClick={handleClick}>
        {comments}
      </div>
    </div>
  );
}

export default UserList;

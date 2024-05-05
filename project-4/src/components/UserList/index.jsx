import React from "react";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";

function UserList({ setState }) {
  const users = models.userListModel();
  return (
    <div>
      <List component="nav">
        {users.map((item) => (
          <Link key={item._id} to={`/users/${item._id}`}>
            <ListItem>
              <ListItemText primary={item.first_name} />
            </ListItem>
            <Divider />
          </Link>
        ))}
      </List>
    </div>
  );
}

export default UserList;

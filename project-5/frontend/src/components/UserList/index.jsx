import React, { useState, useEffect } from "react";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchModel("http://localhost:8081/api/user/list");
      setUsers(data);
    };
    getData();
  });
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

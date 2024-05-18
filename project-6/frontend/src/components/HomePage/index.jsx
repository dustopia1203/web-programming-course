import { useEffect } from "react";
import { useVariable } from "../../globalVariables";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useState } from "react";
import fetchModel from "../../lib/fetchModelData";

function HomePage() {
  const { setState } = useVariable();
  const [data, setData] = useState({});
  useEffect(() => {
    const getData = async () => {
      const data = await fetchModel(`/api/admin/me`);
      setData(data);
    };
    getData();
    setState("Home page");
  }, []);
  return (
    <div>
      <h1>{data.first_name}'s profile</h1>
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
      </Card>
    </div>
  );
}

export default HomePage;

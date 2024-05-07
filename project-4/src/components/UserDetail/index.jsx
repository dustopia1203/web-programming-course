import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { useParams } from "react-router-dom";
import models from "../../modelData/models";
import { useLabel } from "../../label";

function UserDetail() {
  const { setState } = useLabel();
  const user = useParams();
  const data = models.userModel(user.userId);
  useEffect(() => {
    setState(data.first_name + "'s information");
  }, []);
  return (
    <>
      <div>
        <h1>User Detail</h1>
        <p>First name: {data.first_name}</p>
        <p>Last name: {data.last_name}</p>
        <p>Location: {data.location}</p>
        <p>Description: {data.description}</p>
        <p>Occupation: {data.occupation}</p>
      </div>
      <Link to={`/photos/${user.userId}`}>
        <h3>{`${data.first_name} ${data.last_name}'s photos`}</h3>
      </Link>
    </>
  );
}

export default UserDetail;

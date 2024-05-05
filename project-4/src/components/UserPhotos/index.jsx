import React from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import models from "../../modelData/models";
import Comments from "./Comments";

function UserPhotos({ setState }) {
  const user = useParams();
  const data = models.userModel(user.userId);
  const photos = models.photoOfUserModel(user.userId);
  setState("Photos of " + data.first_name);
  return (
    <>
      <div>
        <h1>{`${data.first_name} ${data.last_name}'s photos`}</h1>
        {photos.map((item) => (
          <div key={item._id}>
            <p>Creation date: {item.date_time}</p>
            <img
              src={require(`../../images/${item.file_name}`)}
              alt="item._id"
            />
            <Comments item={item} />
          </div>
        ))}
      </div>
    </>
  );
}

export default UserPhotos;

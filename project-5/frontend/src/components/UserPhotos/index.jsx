import React, { useState, useEffect } from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import Comments from "./Comments";
import { useLabel } from "../../label";

function UserPhotos() {
  const { setState } = useLabel();
  const user = useParams();
  const [data, setData] = useState({});
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data1 = await fetchModel(
        `http://localhost:8081/api/user/${user.userId}`
      );
      setData(data1[0]);
      const data2 = await fetchModel(
        `http://localhost:8081/api/photosOfUser/${user.userId}`
      );
      setPhotos(data2);
    };
    getData();
    setState("Photos of " + data.first_name);
  }, []);
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

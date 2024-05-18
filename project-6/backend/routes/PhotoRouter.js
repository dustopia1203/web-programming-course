const express = require("express");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const fs = require("fs");

router.get("/photosOfUser/:id", async (request, response) => {
  const _id = request.params.id;
  try {
    const data0 = await Photo.find({ user_id: _id });
    if (!data0) {
      response.status(400).send("User with _id:" + id + " not found.");
      return;
    }
    const data1 = data0.map(async (val0) => {
      const comments = await Promise.all(
        val0["comments"].map(async (val1) => {
          const user = await User.find({ _id: val1["user_id"] });
          const userData = {
            _id: user[0]["_id"],
            first_name: user[0]["first_name"],
            last_name: user[0]["last_name"],
          };
          return {
            comment: val1["comment"],
            date_time: val1["date_time"],
            _id: val1["_id"],
            user: userData,
          };
        })
      );
      return {
        _id: val0["_id"],
        user_id: val0["user_id"],
        comments,
        file_name: val0["file_name"],
        date_time: val0["date_time"],
      };
    });
    response.status(200).json(await Promise.all(data1));
  } catch (err) {
    if (err.name === "CastError") {
      response
        .status(400)
        .send("Something other than the id of a User is provided");
    } else {
      response.status(500).send(JSON.stringify(err));
    }
  }
});

router.post("/commentsOfPhoto/:photo_id", async (req, res, next) => {
  const photo_id = req.params.photo_id;
  const { user_id, comment } = req.body;
  try {
    const photo = await Photo.findOne({ _id: photo_id });
    if (!photo) {
      res.status(400).send("Photo with _id:" + photo_id + " not found.");
      return;
    }
    const user = await User.findOne({ _id: user_id });
    if (!user) {
      res.status(400).send("User with _id:" + user_id + " not found.");
      return;
    }
    const newComment = {
      user_id,
      comment,
      date_time: new Date(Date.now()),
    };
    photo.comments.push(newComment);
    await photo.save();
    res.status(201).json(newComment);
  } catch (err) {
    if (err.name === "CastError") {
      res.status(400).send("Something other than the id of a User is provided");
    } else {
      res.status(500).send(JSON.stringify(err));
    }
  }
});

router.post("/photos/new", upload.single("file"), async (req, res, next) => {
  const user = req.user;
  const timestamp = new Date().valueOf();
  const filename = "U" + String(timestamp) + req.file.originalname;
  try {
    fs.writeFile(
      "./public/images/" + filename,
      req.file.buffer,
      function (err) {
        if (err) {
          res.status(400).send("file written failed");
        }
      }
    );
    const photo = await Photo.create({
      file_name: filename,
      date_time: timestamp,
      user_id: user._id,
      comment: [],
    });
    await photo.save();
    res.status(200).json(photo);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;

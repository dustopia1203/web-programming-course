const express = require("express");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const router = express.Router();

router.get("/:id", async (request, response) => {
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

module.exports = router;

const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.get("/list", async (request, response) => {
  const data0 = await User.find({});
  const data1 = data0.map((val) => {
    return {
      _id: val["_id"],
      first_name: val["first_name"],
      last_name: val["last_name"],
    };
  });
  response.status(200).json(data1);
});

router.get("/:id", async (request, response) => {
  const _id = request.params.id;
  try {
    const data0 = await User.find({ _id: _id });
    if (!data0) {
      response.status(400).send("User with _id:" + id + " not found.");
      return;
    }
    const data1 = data0.map((val) => {
      return {
        _id: val["_id"],
        first_name: val["first_name"],
        last_name: val["last_name"],
        location: val["location"],
        description: val["description"],
        occupation: val["occupation"],
      };
    });
    response.json(data1);
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

const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrappers in the world!",
    location: {
      lat: 40.7484405,
      lng: 73.9856644,
    },
    address: "20 W 34th St., New York, NY 10001, United States",
    creator: "u1",
  },
];

router.get("/", (req, res, next) => {
  console.log("GET Request in Places");
  res.json({
    message: "IT WORKS!",
  });
});

module.exports = router;

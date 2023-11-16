const { v4: uuidv4 } = require('uuid');

const HttpError = require("../models/http-error");

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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;

  const place = DUMMY_PLACES.find((p) => {
    return p.id == placeId;
  });

  if (!place) {
    throw new HttpError("Could not find a Place for Provided Id.", 404);
  }

  res.json({
    place,
  });
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => {
    return p.creator == userId;
  });

  if (!place) {
    return next(
      new HttpError("Could not find a Place for Provided User Id.", 404)
    );
  }

  res.json({
    place,
  });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;

  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({
    place: createdPlace,
  });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;

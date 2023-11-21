const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Mian Nouman Ahmed",
    email: "numan1836@gmail.com",
    password: "test123",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid Inputs Passed, Please Check your Data!", 422)
    );
  }

  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing Up Failed, Please Try Again Later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User Exists Already, Please Login Instead.",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocLLCo21Z-cwM2J_-7nqiPLof2k5ThPn2DPcGrpGEv9z18sy=s288-c-no",
    password,
    places,
  });

  try {
    createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up Failed, Please Try Again Later.",
      500
    );
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging In Failed, Please Try Again Later.",
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "Invalid Credentials, Could not Log you in.",
      401
    );
    return next(error);
  }

  res.json({ message: "Logged In!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;

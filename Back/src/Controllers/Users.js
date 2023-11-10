const express = require("express");
const { UserSchema } = require("../Models/Users");
const UserModel = require("../Models/Users");

const getUsers = (req, res) => {
  UserModel.find()
    .then((Users) => res.json(Users))
    .catch((err) => res.json(err));
};

module.exports = getUsers;

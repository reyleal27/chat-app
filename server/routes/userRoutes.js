// const express = require("express");
const { register, login, setAvatar, getallUsers } = require("../controllers/userController");

const router = require("express").Router();


router.post("/register", register);
router.post("/login", login);
router.post("/setavatar/:id", setAvatar);
router.get("/allusers/:id", getallUsers);

module.exports = router;
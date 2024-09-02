const { addMessage,getMsg } = require("../controllers/messagesController");

const router = require("express").Router();

router.post("/addmessage", addMessage);
router.post("/getmessage", getMsg);

module.exports = router;
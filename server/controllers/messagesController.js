
const Messages = require('../model/messageModel'); // Ensure the path is correct

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    if (!from || !to || !message) {
      return res.status(400).json({ msg: 'All fields are required' });
    }
    const data = await Messages.create({
      from,
      to,
      message, // Ensure this is a string
    });
    
    if (data) {
      return res.status(200).json({ msg:message });
    } else {
      return res.status(500).json({ msg: 'Failed to add message to the database' });
    }
  } catch (ex) {
    console.error('Error in addMessage:', ex);
    next(ex);
  }
};



// module.exports.getMsg= async (req, res, next)=>{
//      try {
//          const { from, to } = req.body;
//          const messages = await Messages.find({
//              users: {
//                  $all: [from, to],
//              },
//          }).sort({ updatedAt: 1 });
//          const projectedMessages = messages.map((msg) => {
//              return {
//                  fromSelf: msg.sender.toString() === from,
//                  message: msg.message.text,
//              };
//          });
//          res.json(projectedMessages);
//          console.log(projectedMessages);
//     } catch (err) {
//         next(err)
//     }
// }

module.exports.getMsg = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        if (!from || !to) {
            return res.status(400).json({ error: "Invalid 'from' or 'to' value" });
        }
        const messages = await Messages.find({
            $or: [
                { from, to },
                { from: to, to: from }
            ]
        }).sort({ updatedAt: 1 });
        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.from.toString() === from,
                message: msg.message,
            };
        });
        res.json(projectedMessages);
    } catch (err) {
        console.error("Error getting messages:", err);
        next(err);
    }
};


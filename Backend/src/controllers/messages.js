var messages = [];
const getAllMessages = (req, res, next) => {
  try {
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

const createMessage = (req, res, next) => {
  const { message } = req.body;
  let user = req.user;
  user = {username: user.username};
  try {
    messages.push({user,message})
    res.status(200).json({ message: 'Message created successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllMessages, createMessage };

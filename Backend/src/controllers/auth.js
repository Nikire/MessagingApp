const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var users = [];

const register = (req, res, next) => {
  const { username } = req.body;
  let { password } = req.body;
  try {
    const found = users.find(u => u.username == username);
    if(found){
      return res.status(400).json({error:true, message: "Username already registered."})
    }
    bcrypt.genSalt(10, async (error, salt) => {
      if (error) {
        return res.status(400).json(error);
      }
      bcrypt.hash(password, salt, async (error, hash) => {
        if (error) {
          return res.status(400).json(error);
        }
        password = hash;
        const user = {username, password};
        users.push(user);
        // I'll normally use dotenv to store a secret key generated with a hash generator but I don't think its needed for this test so I'll just use that string
        const accessToken = jwt.sign({ user }, "simulatedsecretkey", {
          expiresIn: '5m',
        });
        res.status(200).header('authorization', accessToken).json({ accessToken, message: 'User created successfully!' });
      });
    });
  } catch (error) {
    next(error);
  }
};

const login = (req, res, next) => {
  const { username } = req.body;
  let { password } = req.body;

  try {
    // User search
    const user = users.find(u => u.username == username);
    if(!user){
      return res.status(404).json({error: true, message: "User not found."});
    }
    
    // Password check
    bcrypt.genSalt(10, async (error, salt) => {
      if (error) {
        return res.status(400).json(error);
      }
      bcrypt.hash(password, salt, async (error, hash) => {
        if (error) {
          return res.status(400).json(error);
        }
        password = hash;
      });
    });
    const hash = user.password;
    bcrypt.compare(password, hash, function (error, result) {
      if (error) {
        return res.status(500).json({ error: true, message: error });
      }
      if (!result) {
        return res.status(401).json({error: true, message: 'Unauthorized, password is incorrect'});
      }
      // If there are no errors, successful login
      const accessToken = jwt.sign({ user }, "simulatedsecretkey", {
        expiresIn: '5m',
      });
      res.status(200).header('authorization', accessToken).json({ accessToken, message: 'User authenticated.' });
    });
  } catch (error) {
    next(error);
  }
};

const getUserInfo = (req, res, next) => {
  try{
    const found = users.find(u => u.username === req.user.username);
    if (!found){
      return res.status(404).json({error:true,message:"User information not found."})
    }
    res.status(200).json(found);
  }catch (error) {
    next(error);
  }
}

module.exports = { register, login, getUserInfo};

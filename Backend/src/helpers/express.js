const jwt = require('jsonwebtoken');

module.exports = {
  errorHandler: () => (err, req, res) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error('ERROR ', err);
    res.status(status).json({ error: true, message });
  },
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: true, message: 'No token provided' });
    }
    // I'll normally use dotenv to store a secret key generated with a hash generator but I don't think its needed for this test so I'll just use that string
    jwt.verify(token, "simulatedsecretkey", (err, { user }) => {
      if (err) {
        return res.status(403).json(err);
      }
      req.user = user;
      next();
    });
  },
  validateUser: (req,res,next) => {
    let { username, name, email, password } = req.body;
    try{
      if (!username || username === '') {
        return res
        .status(400)
        .json({ error: true, message: 'Username must be provided' });
      }
      if (!name || name === '') {
        return res
        .status(400)
        .json({ error: true, message: 'Name must be provided' });
      }
      if (!email || email === '') {
        return res
        .status(400)
        .json({ error: true, message: 'Email must be provided' });
      }
      if (!password || password === '') {
        return res
        .status(400)
        .json({ error: true, message: 'Password must be provided' });
      }

      //RegEx (add frontend instructions)
      let usernameRegEx = /^[a-zA-Z0-9_]{3,20}$/;
      let passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/;
      let emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let nameRegEx = /^[a-zA-Z ]{3,25}$/;

      if (!usernameRegEx.test(username)) {
        return res
          .status(400)
          .json({ error: true, message: 'Invalid password.' });
      }
      if (!passwordRegEx.test(password)) {
        return res
          .status(400)
          .json({ error: true, message: 'Invalid username.' });
      }
      if (!emailRegEx.test(email)) {
        return res
          .status(400)
          .json({ error: true, message: 'Invalid email.' });
      }
      if (!nameRegEx.test(name)) {
        return res
          .status(400)
          .json({ error: true, message: 'Invalid name.' });
      }
      next();
    }catch(err){
      return res.status(500).json({ error: true, message: err.message });
    }
  }
};

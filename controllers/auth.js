const User = require('../models/user');
const jwt = require("jsonwebtoken");

module.exports = {
  signup,
  login
};

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ err: "bad credentials" });
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    // TODO: Send back a JWT instead of the user
    // res.json(user); this was responding with user
        // Be sure to first delete data that should not be in the token
            //could be a social security number or similar
            //something like this in this spot before token
            //user.ssn = null
    //now responding with token
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(400).send({'err': err.errmsg});
  }
}


/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}

//read the docs for more info about expires
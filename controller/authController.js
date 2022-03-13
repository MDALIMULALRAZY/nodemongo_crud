const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { registerValidation, loginValidation  }  = require('../validation');

// validation
const registerModule = async (req, res) => {
const {error} = registerValidation(req.body);
if(error) return res.status(400).send(error.details[0].message);


//check user if data base 
const emailExist = await User.findOne({
email: req.body.email
});
if(emailExist) return res.status(400).send('email already exists');

// Hash paswords 
const salt = await bcrypt.genSalt(10);
const hashpassword = await bcrypt.hash(req.body.password, salt);



const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashpassword
  });

  try {
      const savedUser = await user.save();
      res.send({user: user._id});
  } 
  catch (err) {
      res.status(400).send(err);
  }
};

// Login 

const loginmodule =  async (req, res) =>{
  const {error} = loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);
//check user if data base 
const emailExist = await User.findOne({
  email: req.body.email
  });
  if(!emailExist) return res.status(400).send('Email does not exists!!');

// password is correct
const validPass = await bcrypt.compare(req.body.password, user.password);
if(!validPass) return res.status(400).send('Invalid password');
// create and assion a token 
const token = jwt.sign({_id: user._id}, process.env.TOKKEN_SECRET);
res.header('auth-token', token).send(token);


res.send('loged In');
};

// get all user 




module.exports = {
  loginmodule, 
  registerModule
}















//  old 



// const User = require("../models/User");
// const bcrypt = require("bcrypt");

// //REGISTER
// const registerModule = async (req, res) => {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hash(req.body.password, salt);
//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPass,
//     });

//     const user = await newUser.save();
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// //LOGIN
// const loginmodule = async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     !user && res.status(400).json("Wrong credentials!");

//     const validated = await bcrypt.compare(req.body.password, user.password);
//     !validated && res.status(400).json("Wrong credentials!");

//     const { password, ...others } = user._doc;
//     res.status(200).json(others);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };


// module.exports = {
//   registerModule, 
//   loginmodule,
//   }
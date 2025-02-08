const express = require("express");
const router = express.Router();

const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const jwtSecret = "Atul@Kumar$Singh";

const fetchuser = require('../middleware/fetchuser')

// Route 1 : create the user using: POST "/api/auth/createuser". No login required

router.post(
  "/createuser",
  [
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    body("name").isLength({ min: 3 }).withMessage("Enter the valid name"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be atleast 5 character"),
  ],
  async (req, res) => {
    // if there are erroes return bad request
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    try {
      let success = false;
      //check wether the user with this email already exist
      let user = await User.findOne({ email: req.body.email }); // its a promise

      if (user) {
        return res
          .status(400)
          .json({ success,error: "User with this email already exist...." });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // creating new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      //   .then(user => res.json(user))
      //   .catch((err)=>{console.log("Please enter unique value for email")
      //     res.json({error: "Email already used"})
      //   });

      const data = {
        user: {
          id: user.id
        }
      };

      const authtoken = jwt.sign(data, jwtSecret);
      console.log(authtoken);
      success = true;

      res.json({ success,authtoken });
    } catch (err) {
      console.error(err.Message);
      res.status(500).send("Some error occured");
    }
  }
);

// Route 2 : authenticate the user using: POST "/api/auth/login". No login required

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    body("password").exists().withMessage("Password cannot be empty"),
  ],
  async (req, res) => {
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success,error: "please try to login with correct credentyials" });
      }

      const passComp = await bcrypt.compare(password, user.password);

      if (!passComp) {
        return res
          .status(400)
          .json({ success,error: "please try to login with correct credentyials" });
      }

      const data = {
        user: {
          id: user.id
        }
      };

      const authtoken = jwt.sign(data, jwtSecret);
      success = true;

      res.json({ success,authtoken });
    } catch (err) {
      console.error(err.Message);
      res.status(500).send("Internal server error occured");
    }
  }
);

// Route 3 : get logged in user details using: POST "/api/auth/getuser". login required

router.post(
  "/getuser",fetchuser,async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } 
    catch (error) {
      console.error(err.Message);
      res.status(500).send("Internal server error occured");
    }
  }
);

module.exports = router;

const UserLog = require("../model/UserLog");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.post("/register", async (req, res) => {
  const newUser = new UserLog({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  const errore = "error message send";
  console.log("its", newUser);
  try {
    const user = await UserLog.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json({ error: "user already exists with that email" });
    } else {
      const savedUser = await newUser.save();
      const accessToken = jwt.sign(
        {
          id: savedUser._id,
          isAdmin: savedUser.isAdmin,
        },
        process.env.JWT_SEC,
        {
          expiresIn: "3d",
        }
      );

      const { password, ...others } = savedUser._doc;
      res.status(200).json({ ...others, accessToken });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  const user = {
    email: req.body.email,
  };
  console.log(user);
  try {
    const findUser = await UserLog.findOne(user);
    console.log(findUser);
    if (!findUser) {
      return res.status(401).json({ error: "wrong email" });
    }
    const originalPassword = findUser.password;
    if (originalPassword !== req.body.password) {
      return res.status(401).json({ error: "worng password" });
    }

    const accessToken = jwt.sign(
      {
        id: findUser._id,
        isAdmin: findUser.isAdmin,
      },
      process.env.JWT_SEC,
      {
        expiresIn: "3d",
      }
    );

    const { password, ...others } = findUser._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./utils/db");

const secretAccesTokenKey = process.env.STORE_APP_SECRET_KEY;

const signToken = data => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, secretAccesTokenKey, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      return resolve(token);
    });
  });
};

const checkIfUserExists = async data => {
  try {
    const user = await db.query(
      "select * from `store_users` where `store_users_email` = ? ",
      [`${data}`]
    );

    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const createHash = password => {
  return new Promise((resolve, reject) => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => resolve(hash))
      .catch(err => {
        console.error(err);
        return reject(err);
      });
  });
};

const createUser = async data => {
  const { email, firstname, lastname, password, username } = data;

  try {
    const hash = await createHash(password);
    const result = await db.query(
      "insert into `store_users` " +
        " (`store_users_email`, `store_users_firstname`, `store_users_lastname`, `store_users_username`, `store_users_pwdhash` )" +
        " values (?, ?, ?, ?, ?) ",
      [email, firstname, lastname, username, hash]
    );
    console.log("result", result);
    const userId = result ? result.insertId : 0;
    console.log("userId", userId);
    return userId;
  } catch (err) {
    console.error("create user catch", err);
    throw err;
  }
};

const signupUser = async (req, res) => {
  const { email, password, firstname, lastname, username } = req.body;

  try {
    const user = await checkIfUserExists(email);

    if (user && user.length) {
      return res.status(400).json({ message: "This id is already taken" });
    }

    const userId = await createUser({
      email,
      firstname,
      lastname,
      password,
      username
    });

    console.log("userId", userId);

    if (userId) {
      const token = await signToken({ email, userId });
      return res.status(200).json({ auth: true, token });
    } else {
      return res.status(500).json({ message: "An Error Occured" });
    }
  } catch (err) {
    return res.status(500).json({ message: "An Error Occured" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await checkIfUserExists(email);

    if (!user || !user.length) {
      return res.status(403).json({ message: "Invalid Username Or Password" });
    }

    console.log("user id login", user[0].store_users_id);
    const userId = user[0] ? user[0].store_users_id : null;
    if (!userId)
      return res.status(500).json({ error: "Internal Server Error" });

    const result = await bcrypt.compare(password, user[0].store_users_pwdhash);

    if (result) {
      const token = await signToken({ email, userId });
      return res.status(200).json({ auth: true, token });
    } else {
      return res.status(403).json({ auth: false, message: "Unauthorized" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const logoutUser = (req, res) => {
  return res
    .status(200)
    .json({ auth: false, token: null, message: "user is logged out" });
};

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.all("*", (req, res) => {
  res.redirect("/other");
});

module.exports = router;

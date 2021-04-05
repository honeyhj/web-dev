const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/Users");

const userRegister = async (userDets, role, res) => {
  try {
    let usernameNottaken = await validateUsername(userDets.username);

    if (!usernameNottaken) {
      return res.json({
        messege: { msg: "Username already taken" },
        success: false,
      });
    }

    let emailNotRegistered = await validateEmail(userDets.email);

    if (!emailNotRegistered) {
      return res.json({
        messege: { msg: "Email already taken" },
        success: false,
      });
    }

    const password = await bcrypt.hash(userDets.password, 10);
    let activeToken = jwt.sign(
      {
        email: userDets.email,
      },
      process.env.SECRET,
      {
        expiresIn: "1 day",
      }
    );
    const send = require("gmail-send")({
      user: "tenminuteversity@gmail.com",
      pass: process.env.pass,
      to: userDets.email,
      subject: "Activate your account",
      html:
        '<p>Click <a href="http://localhost:5000/active/' +
        activeToken +
        '">here</a> to activate your account</p>',
    });

    send(
      {
        text: "Thank you for staty with us",
      },
      (error, result, fullResult) => {
        if (error) {
          console.log(error);
          return res.json({
            messege: {
              msg: "gmail sent problem",
              success: false,
            },
          });
        } else {
          const newUser = new User({
            ...userDets,
            password,
            role,
            activeToken,
          });

          newUser
            .save()
            .then((data) => {
              console.log("email has sent");
              return res.json({
                messege: {
                  msg: "Hurry registerd",
                  success: true,
                },
              });
            })
            .catch((error) => {
              return res.json({
                messege: {
                  msg: "Unable to create your account",
                  success: false,
                },
              });
            });
        }
      }
    );
  } catch {
    return res.json({
      messege: {
        msg: "opps not registerd",
        success: false,
      },
    });
  }
};

const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};
const userLogin = async (userCreds, role, res) => {
  let { username, password } = userCreds;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      messege: {
        msg: "admin error",
        success: false,
      },
    });
  }
  if (user.role !== role) {
    return res.status(403).json({
      messege: {
        msg: "Please login right portal",
        success: false,
      },
    });
  }
  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(403).json({
      messege: {
        msg: "Incorrect credentials",
        success: false,
      },
    });
  }

  if (user && user.confirmed === false) {
    return res.status(404).json({
      messege: {
        msg: "You didnt confirmed your account yet",
        success: false,
      },
    });
  }

  let token = jwt.sign(
    {
      user_id: user._id,
      role: user.role,
      username: user.username,
      email: user.email,
    },
    process.env.SECRET,
    {
      expiresIn: 168,
    }
  );

  let result = {
    username: user.username,
    role: user.role,
    token: `Bearer ${token}`,
    email: user.email,
    expiresIn: 168,
  };

  return res.status(200).json({
    ...result,
    msg: "Hurry you logged in",
    success: true,
  });
};
const checkRole = (roles) => (req, res, next) => {
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();
};
const userAuth = (req, res, next) => {
  if (req.header("auth")) {
    const mytoken = req.header("auth").split(" ");
  } else {
    return res.status(404).json({
      messege: {
        msg: "you dont have any token",
        success: false,
      },
    });
  }
  const mytoken = req.header("auth").split(" ");
  if (mytoken[1]) {
    return jwt.verify(mytoken[1], process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(404).json({
          messege: {
            msg: "Failed to authenticate",
            success: false,
          },
        });
      }
      req.user = decoded;
      return next();
    });
  }
};
module.exports = {
  userRegister,
  userLogin,
  checkRole,
  userAuth,
};

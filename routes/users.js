const router = require("express").Router();
const User = require("../model/Users");
const { check, body, validationResult } = require("express-validator");

const {
  userRegister,
  userLogin,
  userAuth,
  checkRole,
} = require("../utils/Auth");
router.post(
  "/register",
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }

    return true;
  }),
  [
    body("fullname").isLength({ min: 3 }).withMessage("Name is required."),
    body("username").isLength({ min: 3 }).withMessage("username is required."),

    body("email")
      .isLength({ min: 1 })
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Please provide a valid email address"),

    body("Mobile")
      .isLength({ min: 11 })
      .withMessage("Mobile number is required.")
      .matches(/\d/)
      .withMessage("must contain a number"),

    body("Address").isLength({ min: 1 }).withMessage("address is required."),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 chars long")
      .matches(/\d/)
      .withMessage("must contain a number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await userRegister(req.body, "user", res);
  }
);

router.get("/active/:activeToken", (req, res, next) => {
  User.findOne(
    {
      activeToken: req.params.activeToken,
    },
    (err, user) => {
      console.log(user);
      if (err) return next(err);
      if (!user) {
        return res.render("messege", {
          title: "Fail to activate",
          content:
            'Your activation link is invalid ,Please <a href="/register">Register</a> here',
        });
      } else {
        user.confirmed = true;
        user.save().then((ok) => {
          res.send("completed registration");
        });
      }
    }
  );
});
router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});

router.get(
  "/user-protected",
  userAuth,
  checkRole(["user", "admin"]),
  async (req, res) => {
    return res.json("hello user");
  }
);
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

module.exports = router;

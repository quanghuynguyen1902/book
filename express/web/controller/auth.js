const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.signUp = function (req, res) {
  const { username, email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err,
      });
    } else if (user) {
      return res.status(400).json({
        success: false,
        message: "Tai khoan da ton tai",
      });
    }
    user = new User({
      username,
      email,
      password,
    });
    user.save(function (err) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err,
        });
      }
      res.status(201).json({
        success: true,
        data: user,
      });
    });
  });
};

exports.signIn = function (req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      message: "Bạn cần nhập email và mật khẩu",
    });
  }
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err,
      });
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email không tồn tại",
      });
    }
    bcrypt.compare(password, user.password, function (err, isMatch) {
      if (err) {
        console.log(err);
      }
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Mật khẩu của bạn không đúng",
        });
      }
      let payload = { email: user.email };

      let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
      });

      //create the refresh token with the longer lifespan
      let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.REFRESH_TOKEN_LIFE,
      });

      process.env.access_token = accessToken;
      process.env.refresh_token = refreshToken;
      return res.status(201).json({
        success: true,
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    });
  });
};

exports.refresh = function (req, res) {
  let refreshToken = process.env.refresh_token;
  if(!refreshToken){

  }
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    function (err, payload) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err,
        });
      }
      let newToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
      });

      process.env.access_token = newToken;
      res.status(200).json({
        success: true,
        access_token: newToken,
      });
    }
  );
};

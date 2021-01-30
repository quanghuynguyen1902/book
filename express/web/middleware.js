const jwt = require("jsonwebtoken");

exports.verify = function (req, res, next) {
  // console.log(req.cookies.jwt)
  // let accessToken = req.cookies.jwt;
  let accessToken = process.env.access_token
  //if there is no token stored in cookies, the request is unauthorized
  if (!accessToken) {
    return res.status(403).json({
      success: false,
      message: "Ban không được phép truy cập",
    });
  }

  let payload;
  try {
    //use the jwt.verify method to verify the access token
    //throws an error if the token has expired or has a invalid signature
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET) ;
    next();
  } catch (e) {
    //if an error occured return request unauthorized error
    return res.status(401).json({
      success: false,
      message: e
    });
  }
};

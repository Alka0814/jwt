const jwt = require("jsonwebtoken");
const { Blacklist } = require("../models/blacklist.model");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const auth = async (req, res, next) => {
  // verify accessToken
  // check if it is not blacklisted
  // then call next
  const { pscAccessToken } = req.cookies;
  const isTokenBlacklisted = await Blacklist.findOne({ token: pscAccessToken });
  if (isTokenBlacklisted)
    return res.status(400).send({ msg: "Please login..." });


// Check if the user exists
const user = await UserModel.findById(userID);
const role=user?.role
   req.role=role

if (!user) {
  return res.status(400).json({ message: "User not found" });
}

next();




  jwt.verify(
    pscAccessToken,
    "jwtsecretkeyfromenvfile",
    async (err, decoded) => {
      if (err) {
        if (err.message === "jwt expired") {
          const newAccessToken = await fetch(
            "http://localhost:8500/auth/refresh-token",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: req.cookies.pscRefreshToken,
              },
            }
          ).then((res) => res.json());
          res.cookie("pscAccessToken",newAccessToken,{maxAge:1000*60});
          next();
        }
      } else {
        console.log(decoded);
        next();
      }
    }
  );
};

module.exports = { auth };
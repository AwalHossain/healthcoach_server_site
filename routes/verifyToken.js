// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.token;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, process.env.JWT_SEC, (err, user) => {
//       if (err) res.status(403).json("Token is not valid");
//       req.user = user;
//       next();
//     });
//   } else {
//     res.status(401).json("You are not authenticated");
//   }
// };

// const verfiyTokenAndAuthorization = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.id === req.param.id || req.user.isAdmin) {
//       next();
//     } else {
//       res.status(403).json("You are not allowed to do that");
//     }
//   });
// };

// const verifyAdmin = (req, res, next) => {
//   verifyToken(req, res, () => {
//     console.log(req.user);
//     if (req.user.isAdmin) {
//       next();
//     } else {
//       res.status(403).json("You are not allowd to this");
//     }
//   });
// };

// module.exports = { verifyToken, verifyAdmin, verfiyTokenAndAuthorization };

const jwt = require("jsonwebtoken");

console.log();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authentication;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid");
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authorized");
  }
};

const verfiyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.id);
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do fucking this");
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do this");
    }
  });
};

module.exports = { verifyToken, verifyAdmin, verfiyTokenAndAuthorization };

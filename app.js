const express = require("express");
const cors = require("cors");

const app = express();

// var corsOptions = {
//   origin: "http://localhost:4200"
// };

// app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(logRequestStart);
// Default route
app.get("/", (req, res) => {
  res.json({ message: "Food-Truck-as-a-Service is running" });
});

require("./server/routes/auth.routes.js")(app);
require("./server/routes/item.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

process.on('SIGINT', function () {
  console.warn(`Cleaning node data before exit`);
});

process.on('uncaughtException', function (err) {
  console.error(err);
});

process.on('unhandledRejection', function (err) {
  console.error(err);
});

/**
 * Do request url logging
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function logRequestStart(req, res, next) {
  let logUrl = getRequestUrl(req);
  console.log(getClientIp(req) + ` : ${req.method} : ${logUrl}`);
  next();
}
/**
 * Get URL of request
 * @param {*} req 
 * @returns 
 */
function getRequestUrl(req) {
  let protocol = req.protocol;
  return protocol + "://" + req.get('host') + req.url;
}

/**
 * Get client IP
 * @param {*} req 
 * @returns 
 */
function getClientIp(req) {
  
  let ip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] ||
      req.connection.remoteAddress || req.ip;

  return ip;
}
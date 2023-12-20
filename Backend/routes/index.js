const express = require("express");
const userRoute = require("./user.routes");

const { BASE_API_URL } = require("../utils/env");

const router = express.Router();

const defaultRoutes = [
  {
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(BASE_API_URL, route.route);
});

module.exports = router;

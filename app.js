const express = require("express");
require("dotenv").config();
const connection = require("./model/connection");
const { router } = require("./routes/postsRoutes");
const app = express();
const port = process.env.port || 4000;
app.use(express.json());
app.use(router);
app.listen(port, () => {
  console.log(`server started on ${port}..`);
});

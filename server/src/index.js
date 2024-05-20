const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const blogsRoute = require("./Routes/BlogRoute");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const specs = require("./swaggerDef");
const app = express();

app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static(__dirname + "/public"));

require("dotenv").config();

const { MONGO_URL, PORT, WEB_URL } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.static("../client/dist"));

app.use("/api/auth", authRoute);
app.use("/api/blogs", blogsRoute);

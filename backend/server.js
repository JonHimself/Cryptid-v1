const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const path = require("path");

const app = express();

dotenv.config();
connectDB();
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/users", userRoutes);

////deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Running...");
  });
}
////deployment

app.use(notFound);
app.use(errorHandler);

app.listen(8000, () => console.log("Listening on port 8000 bb"));

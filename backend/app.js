const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes")
const slotRoutes = require("./routes/SlotRoutes")
const SessionRoutes = require("./routes/SessionRoutes")
const cors = require("cors")
const app = express();

dotEnv.config();

app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json())


app.use("/api/user/", userRoutes);
app.use("/api/slot/", slotRoutes);
app.use("/api/session/", SessionRoutes);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(process.env.PORT, (req, res) => {
      console.log("Sever started on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

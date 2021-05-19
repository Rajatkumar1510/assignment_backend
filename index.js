import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// Routes
// Post Routes
app.use("/posts", postRoutes);
// Authentication route
app.use("/user", userRoutes);

// home route

app.use("/", (req, res) => {
  res.send("Server is running");
});

// database connection url got from mongodb atlas cluster
const db_url =
  "mongodb+srv://test:test@test.5r6gs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = 1000;
//connection to database
mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(PORT, () => {
      console.log(`Connected to Database, Server running on ${PORT}`);
    })
  )
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);

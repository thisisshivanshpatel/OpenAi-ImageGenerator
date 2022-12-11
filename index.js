require("dotenv").config();
const express = require("express");
const path = require("path");
const { info } = require("ps-logger");
const openAIRoutes = require("./routes/openAIRoutes");

const app = express();

const PORT = process.env.PORT;

// middleware

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// openAI routes
app.use("/openAI", openAIRoutes);

// home route
// app.get("/", (req, res) => {
//   res.json({ message: "welcome to the OPEN AI Image Generator App" });
// });

// listener
app.listen(PORT, () => {
  info(`server is listening on PORT ${PORT}`);
});

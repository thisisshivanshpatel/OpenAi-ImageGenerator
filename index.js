require("dotenv").config();
const express = require("express");
const { info } = require("ps-logger");
const openAIRoutes = require("./routes/openAIRoutes");

const app = express();

const PORT = process.env.PORT;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/openAI", openAIRoutes);

// home route
app.get("/", (req, res) => {
  res.json({ message: "welcome to the OPEN AI Image Generator App" });
});

// listener
app.listen(PORT, () => {
  info(`server is listening on PORT ${PORT}`);
});

//importing express and cors to allow requests
const express = require("express");
const cors = require("cors");

//variable to handle express
const app = express();
const PORT = 3011;

const jokesRoute = require("./routes/jokes");
const riddleRoute = require("./routes/riddles");

//middleware to parse json
app.use(express.json());
//middleware to enable cors
app.use(cors());

app.use("/jokes", jokesRoute);
app.use("/riddles", riddleRoute);

app.get("/", (req, res) => {
  res.send("Louy Chat Bot");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

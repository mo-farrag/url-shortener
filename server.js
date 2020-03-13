const express = require("express");
const urlShortener = require("./routes/urlShortener");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/", urlShortener);

app.listen(process.env.PORT || 5000);

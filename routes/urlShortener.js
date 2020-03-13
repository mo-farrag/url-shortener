const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ShortUrl = require("../models/shortUrl");

mongoose.connect("mongodb://localhost/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

router.get("/", async (req, res) => {
  const urls = await ShortUrl.find();
  res.render("index", { shortUrls: urls });
});

router.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

router.get("/:shortUrl", async (req, res) => {
  const url = await ShortUrl.findOne({ short: req.params.shortUrl });

  if (!url) res.sendStatus(404);

  url.clicks++;
  url.save();

  res.redirect(url.full);
});

module.exports = router;

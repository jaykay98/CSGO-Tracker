const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/steam/:name", async (req, res) => {
  try {
    const headers = {
      "TRN-Api-Key": process.env.TRACKER_API_KEY
    };

    const { name } = req.params;

    const response = await fetch(
      `${process.env.TRACKER_API_URL}/profile/steam/${name}`,
      { headers }
    );

    const data = await response.json();

    if (data.errors && data.errors.length > 0) {
      return res.status(404).json({
        message: "Profile Not Found Or May Be Private"
      });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

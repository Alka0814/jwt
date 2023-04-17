const mongoose = require("mongoose");

const BlackListSchema = mongoose.Schema({
  token: { type: String, required: true },
});

const Blacklist = mongoose.model("blacklist", BlackListSchema);
module.exports = { Blacklist };

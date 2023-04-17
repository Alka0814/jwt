const express = require("express");
const { BlogModel } = require("../Model/blog.model");
BlogRouter = express.Router();
// const jwt = require("jsonwebtoken");
const { authenticate } = require("../middlewares/auth");
const { authrolechecker} = require("../middlewares/auth-role-checker");

// this will add products
BlogRouter.post("/add", authenticate,authrolechecker(["user"]), async (req, res) => {
  const payload = req.body;

  try {
    const product = new PostModel(payload);
    await product.save();
    res.status(200).send({ msg: "New blog has been Added in Database" });
  } catch (err) {
    res.status(404).send({ msg: "Not able to add blog" });
  }
});


//this will show you products



BlogRouter.get("/", authenticate , authrolechecker(["user"]), async (req, res) => {
  // const token = req.headers.authorization;
  // const decoded = jwt.verify(token, "masai");
  try {
    const product = await BlogModel.find({}); //userID:decoded.userID
    res.status(200).send(product);
  } catch (err) {
    res.status(404).send({ msg: "Not able to read" });
  }
});


// this will update the products
BlogRouter.put("/update/:userid",authenticate,authrolechecker(["user"]), async (req, res) => {
  const { userid } = req.params;
  const payload = req.body;
  try {
    await PostModel.findByIdAndUpdate({ _id: userid }, payload);
    res.status(200).send("Product has been updated");
  } catch (err) {
    res.status(404).send({ msg: "Not able to update" });
  }
});

// this willl delete the products
PostRouter.delete("/delete/:userid",authenticate,authrolechecker(["moderator","user"]) ,async (req, res) => {
  const { userid } = req.params;

  try {
    await BlogModel.findByIdAndDelete({ _id: userid });
    res.status(200).send("Product has been deleted");
  } catch (err) {
    res.status(404).send({ msg: "Not able to delete" });
  }
});




module.exports = { PostRouter };

const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../models/User");
const Shoe = require("../models/Shoe");
const jwt = require("jsonwebtoken");

router.get("/:id", verify, async (req, res) => {
  current = await User.findById(req.user._id);
  shoe = await Shoe.findById(req.params.id);
  if (current.bag[shoe._id]) {
    current.bag[shoe._id].countInBag = current.bag[shoe._id].countInBag + 1;
  } else {
    shoe.countInBag = 1;
    current.bag[shoe._id] = shoe;
  }
  final = await User.findByIdAndUpdate(current._id, current, { new: true });
  const token = current.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(final);
});

router.delete("/:id", verify, async (req, res) => {
  current = await User.findById(req.user._id);
  current = current.toObject();
  shoe = await Shoe.findById(req.params.id);
  if (current.bag[shoe._id].countInBag > 1) {
    current.bag[shoe._id].countInBag = current.bag[shoe._id].countInBag - 1;
  } else {
    delete current.bag[shoe._id];
  }
  final = await User.findByIdAndUpdate(current._id, current, { new: true });

  res.send(final);
});

module.exports = router;

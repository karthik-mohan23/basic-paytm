const mongoose = require("mongoose");
const authMiddleware = require("../middlewares/authMiddleware");
const Account = require("../models/accounts.models");

const router = require("express").Router();

// Method: GET
// Route: /api/v1/accounts/balance

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ user: req.userId });

  if (!account) {
    return res.status(404).json({ message: "No account found" });
  }

  res.json({
    balance: account.balance,
  });
});

// Method: POST
// Route: /api/v1/accounts/transfer

router.post("/transfer", authMiddleware, async (req, res) => {
  // const session = await mongoose.startSession();

  // session.startTransaction();
  const { amount, to } = req.body;
  console.log(req.userId);
  // Fetch the accounts within the transaction
  // const account = await Account.findOne({ userId: req.userId }).session(
  //   session
  // );
  const account = await Account.findOne({ userId: req.userId });

  console.log(account);

  if (!account || account.balance < amount) {
    // await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  // const toAccount = await Account.findOne({ userId: to }).session(session);
  const toAccount = await Account.findOne({ userId: to });

  if (!toAccount) {
    // await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  // Perform the transfer
  // await Account.updateOne(
  //   { userId: req.userId },
  //   { $inc: { balance: -amount } }
  // ).session(session);
  // await Account.updateOne(
  //   { userId: to },
  //   { $inc: { balance: amount } }
  // ).session(session);
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  );
  await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

  // Commit the transaction
  // await session.commitTransaction();

  res.json({
    message: "Transfer successful",
  });
});

module.exports = router;

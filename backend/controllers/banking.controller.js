const User = require("../models/user.model");
const Transaction = require("../models/transaction.model");

const getAllUsers = async (req, res) => {
  try {
    const allUser = await User.find({});
    res.status(200).send(allUser);
  } catch (error) {
    res.status(500).send({
      code: 500,
      message: "Unable to fetch all users",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!(userId >= 1 && userId <= 20)) {
      res.status(400).send({
        code: 400,
        message: "User id must be between 1 to 20",
      });
    } else {
      const user = await User.findOne({ userid: userId });
      res.send({
        code: 200,
        user: user,
      });
    }
  } catch (error) {
    res.status(500).send({
      code: 500,
      message: "Unable to fetch the user",
    });
  }
};

const doTransaction = async (req, res) => {
  const { sendUser, getUser, amount } = req.query;
  //   console.log(req.query);
  if (!(sendUser >= 1 && sendUser <= 20)) {
    res.status(400).send({
      code: 400,
      message: "Invalid Send User Id",
    });
  } else if (!(getUser >= 1 && getUser <= 20)) {
    res.status(400).send({
      code: 400,
      message: "Invalid Get User Id",
    });
  } else {
    try {
      const sendUserData = await User.findOne({ userid: parseInt(sendUser) });
      const getUserData = await User.findOne({ userid: parseInt(getUser) });

      if (parseInt(amount) > parseInt(sendUserData.balance)) {
        res.status(400).send({
          code: 400,
          message: "Amount is greater than available balance",
        });
        return;
      }

      const sendUserAmount = parseInt(sendUserData.balance) - parseInt(amount);
      const getUserAmount = parseInt(getUserData.balance) + parseInt(amount);

      const updateSendObj = { balance: sendUserAmount };
      const updateGetObj = { balance: getUserAmount };

      const updatedSendData = await User.findOneAndUpdate(
        { userid: sendUser },
        { $set: updateSendObj },
        { returnOriginal: false }
      );
      const updatedGetData = await User.findOneAndUpdate(
        { userid: getUser },
        { $set: updateGetObj },
        { returnOriginal: false }
      );

      const transactionObj = {
        sendUserId: sendUserData.userid,
        getUserId: getUserData.userid,
        sendUsername: sendUserData.name,
        getUsername: getUserData.name,
        amount: parseInt(amount),
      };

      const newTransaction = new Transaction(transactionObj);
      const saveTransaction = await newTransaction.save();

      res.status(201).send({
        code: 201,
        message: "Transaction Successfull",
        sendUserData: updatedSendData,
        getUserData: updatedGetData,
        transaction: saveTransaction,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        code: 500,
        message: "Unable to perform transcation",
      });
    }
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const allTransaction = await Transaction.find({});
    allTransaction.reverse();
    res.status(200).send(allTransaction);
  } catch (error) {
    res.status(500).send({
      code: 500,
      message: "Unable to fetch all transcations",
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  doTransaction,
  getAllTransactions,
};

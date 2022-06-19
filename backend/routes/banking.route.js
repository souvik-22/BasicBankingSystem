const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  doTransaction,
  getAllTransactions,
} = require("../controllers/banking.controller");

router.get("/allusers", getAllUsers);
router.get("/user/:id", getUserById);
router.patch("/transaction", doTransaction);
router.get("/alltransactions", getAllTransactions);

module.exports = router;

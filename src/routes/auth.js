const express = require("express");
const router = express.Router();
const { checkEmailUsernameUni } = require("../middleware/verifySignUp");
const { signUp, signIn } = require("../controllers/auth");

router.post("/sign_up", [checkEmailUsernameUni], signUp);

router.post("/sign_in", signIn);

module.exports = router;

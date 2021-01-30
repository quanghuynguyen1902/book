const authController = require('../../controller/auth')
const express = require('express')
const { userValidationRules, validate } = require('../../validator')
const router = express.Router()

router.route("/login").post(authController.signIn)
router.route("/register").all(userValidationRules(), validate).post(authController.signUp)
router.route("/refresh").get(authController.refresh)

module.exports = router
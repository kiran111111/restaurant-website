// Validation of registration form by the EXPRESS VALIDATOR

const express = require("express");
const { check, validationResult } = require('express-validator')

const userValidationRules = () => {
  return [
   // name should be valid
check('name').isLength({min:8}).trim().escape().not().isEmpty()
              .matches(/^[a-zA-Z0-9-_][^(?|#|*|@|&|\.\ )]{7,20}$/)
              .withMessage('Name must have atleast one uppercase ,of 8 letters, no spaces , no Special symbol'),
    // username must be an email
 check('username','Username should be an email').isEmail().normalizeEmail().isLength({ min: 10 }),
    // password must be at least 5 chars long
    // TODO--- we can add regex to password too  -- I have a good one----
 check('password').trim().isLength({ min: 5 }).withMessage("Password should have atleast 5 letters"),
  ]
}


const storeValidationRules = () =>{
  return [
    check('uniqueName').isLength({min:8}).trim().escape().not().isEmpty()
              .matches(/^([a-z]*)([-]{1}[a-z0-9]+)*$/)
              .withMessage('All lowercase can be separated by hyphen only'),
  ]
}


const validate = (req, res, next) => {
  const errors =validationResult(req);
  if (errors.isEmpty()) {
    return next()
  }
  var extractedErrors = [];
  errors.array().map(err => extractedErrors.push((err.msg)))

 res.locals.errors = extractedErrors.slice(1);
 res.render('register')
}

module.exports = {
 userValidationRules,
 validate,
 storeValidationRules
}
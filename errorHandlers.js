


/*
  MongoDB Validation Error Handler
  Detect if there are mongodb validation errors that we can nicely show via flash messages
*/

exports.flashValidationErrors = (err, req, res, next) => {
 if (!err.errors) return next(err);
 // validation errors look like
 const errorKeys = Object.keys(err.errors);
 errorKeys.forEach(key => req.flash('error', err.errors[key].message));
 res.redirect('back');
};


/*
  Production Error Handler
  No stacktraces are leaked to user
*/
exports.productionErrors = (err, req, res, next) => {
 res.status(err.status || 500);
 res.render('error', {
  status:500,
   message: err.message,
   error: {}
 });
};
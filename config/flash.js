// create a middleware to set flesh messages in response locals object.
module.exports.setflash = function(req, res, next) {
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error'),
        'failureFlash': req.flash('failureFlash')
    }
    next();
}
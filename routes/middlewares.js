/*
 * Middleware para sessions.flash e session.login
 * Coloca valores em res.locals para aparecer na view
 */
module.exports = function(app){

  app.use(function(req, res, next){
    var err = req.session.error,
        msg = req.session.notice,
        success = req.session.success,
        flash = req.session.flash;

    delete req.session.flash;
    delete req.session.error;
    delete req.session.success;
    delete req.session.notice;

    if (err) res.locals.error = err;
    if (msg) res.locals.notice = msg;
    if (success) res.locals.success = success;
    if (flash) res.locals.flash = flash;

    next();

  });

}

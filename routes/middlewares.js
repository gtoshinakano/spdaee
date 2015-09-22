/*
 * Middleware para sessions.flash e session.login
 * Coloca valores em res.locals para aparecer na view
 * Desloga usuário caso tempo de lastAccess ultrapasse var expira
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

    //para verificar login e paginas restritas
    var atual = new Date();
    var minuto = 60000; // Minutos em Milissegundos
    var expira  = minuto * 60; //Quantidade de minutos para expirar
    var restrict = ["/", "/about"];
    if (restrict.indexOf(req.path) >= 0 && typeof req.session.login == 'undefined') {
      req.session.error = "Página restrita. Faça o login pelo formulário abaixo";
      return res.redirect(303, '/login');
    }else{
      if(atual.getTime() - req.session.lastAccess >= expira){
        req.session.error = "Tempo de sessão expirado";
      	delete req.session.login;
      	delete req.session.nivel;
      	delete req.session.lastAccess;
      	return res.redirect(303, '/login');
      }else
        req.session.lastAccess = atual.getTime();
        next();
    }
  });

}

/*
 * Middleware para fechar páginas restritas
 * Desloga usuário caso tempo de lastAccess ultrapasse var expira
 */
exports.simpleSession = function(app){

  app.use(function(req, res, next){
    //para verificar login e paginas restritas
    var atual = new Date();
    var minuto = 60000; // Minutos em Milissegundos
    var expira  = minuto * 60; //Quantidade de minutos para expirar
    if (typeof req.session.login == 'undefined') {
      req.session.error = "Página restrita. Faça o login pelo formulário abaixo";
      return res.redirect(303, '/login');
    }else{
      if(atual.getTime() - req.session.lastAccess >= expira){
        req.session.error = "Deslogado por tempo de inatividade (60 minutos)";
      	return res.redirect(303, '/logout');
      }else
        req.session.lastAccess = atual.getTime();
        next();
    }
  });

}

/*
 * Middleware para fechar páginas restritas
 * @param nível de permissão necessário para acesso
 */
exports.redirectByPermission = function(app, nivel){

  app.use(function(req, res, next){

    if (req.session.nivel < nivel){

      req.session.error = "Página restrita para o seu nível de permissão";
      return res.redirect(303, '/about');

    }else
      next();

  });

}

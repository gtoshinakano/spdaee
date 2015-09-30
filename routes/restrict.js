/*
 * Middleware para fechar páginas restritas
 * Desloga usuário caso tempo de lastAccess ultrapasse var expira
 */
module.exports = function(app){

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

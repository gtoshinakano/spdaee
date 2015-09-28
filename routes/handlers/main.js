exports.about = function(req, res){
	res.render('about');
};

exports.login = function(req, res){

	res.render('login');
}

exports.signup = function(req,res){


	res.render('signup');

}

var User = require('../../models/user');

/*
 * Inserção de usuarios
 */
exports.signupPost = function(req, res){
	console.log(req.body.nome);
	var invalid = 0;
	var message = "";
	var saveData = {};
	saveData.local = {};
	if(req.body.nome.length < 10){
		invalid++;
		message+= "Nome muito curto || ";
	}else{
		saveData.nome = req.body.nome;
	}
	if(req.body.prontuario < 100){
		invalid++;
		message+= "Prontuário muito baixo. || ";
	}else{
		saveData.prontuario = req.body.prontuario;
		saveData.login = req.body.prontuario;
		saveData.senha = req.body.prontuario;
		saveData.cargo = req.body.cargo;
	}
	if(req.body.divisao == "" && req.body.secao == "" && req.body.setor == "" && req.body.servico == ""){
		invalid++;
		message+= "Pelo menos um(a) Divisão/Serviço/Seção/Setor deve ser preenchido(a). || ";
	}else{
		saveData.local.divisao = req.body.divisao;
		saveData.local.secao   = req.body.secao;
		saveData.local.setor   = req.body.setor;
		saveData.local.servico = req.body.servico;
	}
	if(invalid > 0){
		res.locals.error = message;
		res.render('signup');
	}else{
		User.findOne({ 'nome' :  req.body.nome }, function(err, user){
			if (err)
	    	res.locals.error = "erro " + err;
			if (user) {
				res.locals.error = "Usuario "+ req.body.nome +" já existe";
				res.render('signup');
			} else {
				res.locals.success = "Usuário cadastrado com sucesso";
				new User(saveData).save();
				res.render('signup');
			}

		});
	}

}

/*
 * Script de login quando recebe POST
 */
exports.loginPost = function(req, res, next){
	var data = {};
	var query = User.findOne({ 'login' : req.body.login, 'senha': req.body.password });
	query.exec(function(err, user){
		if (err){
    	data.message = "erro " + err;
			req.session.error = err;
			next(err);
		}
		if (user) {
			data.message = "Usuario " + req.body.login + " existente";
			res.locals.success = data.message;
			req.session.login = user.login;
			req.session.nivel = user.nivel;
			var now = new Date();
			req.session.lastAccess = now.getTime();
			return res.redirect(303, '/about');
		} else {
			data.message = "Usuário não encontrado.";
			res.locals.error = data.message;
			res.render('login', data);
		}
	});
}

/*
 * Script de logout, volta para a página de login
 */
exports.logout = function(req,res){

	req.session.notice = "Deslogado";
	delete req.session.login;
	delete req.session.nivel;
	delete req.session.lastAccess;
	return res.redirect(303, '/login');
}

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
exports.signupPost = function(req, res){
	console.log(req.body.login);

	var data = {};
	User.findOne({ 'login' :  req.body.login }, function(err, user){
		if (err)
    	data.message = "erro " + err;
		if (user) {
			data.message = "Usuario " + req.body.login + " existente";
			console.log(user);
		} else {
			console.log("TODO");
			data.message = "TODO";

		}

	});
console.log('aio');
	res.render('signup', data);
}

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
			//req.session.logggedin = implementar
			return res.redirect(303, '/about');
		} else {
			data.message = "Usuário não encontrado.";
			res.locals.error = data.message;
			res.render('login', data);
		}
	});

}

exports.logout = function(req,res){

	req.session.notice = "Deslogado";
	delete req.session.login;
	delete req.session.nivel;
	return res.redirect(303, '/login');
}

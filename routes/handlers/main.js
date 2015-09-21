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

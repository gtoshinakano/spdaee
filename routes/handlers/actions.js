exports.about = function(req, res){
	res.render('about');
};

exports.login = function(req, res){

	res.render('login');
}

exports.signup = function(req,res){

	res.render('signup');

}

exports.signupPost = function(req, res){
	console.log(req.body.email);
	

	res.render('signup');
}

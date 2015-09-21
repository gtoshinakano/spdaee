var main = require('./handlers/main.js'),
    restrict = require('./handlers/restrict.js');
//	user = require('./handlers/user.js');

module.exports = function(app,passport){

  //Main routes
  app.get('/', main.about);
  app.get('/login', main.login);
	app.get('/signup', main.signup);
  

}

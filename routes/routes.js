var main = require('./handlers/main.js');
//	user = require('./handlers/user.js');

module.exports = function(app){

  //Main routes
  app.get('/', main.home);
	app.get('/user', main.home);
  //app.get('/', main.home);

}
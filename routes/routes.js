var main = require('./handlers/main.js'),
    restrict = require('./handlers/restrict.js'),
    actions = require('./handlers/actions.js');

module.exports = function(app){

  //Main routes
  app.get('/', main.about);
  app.get('/login', main.login);
	app.get('/signup', main.signup);
  app.post('/signup', main.signupPost);

  //Actions routes


}

var main = require('./handlers/main.js'),
    migration = require('./handlers/migration.js'),
    actions = require('./handlers/actions.js');

module.exports = function(app){

  //Main routes
  app.get('/', main.about);
  app.get('/about', main.about);
  app.get('/login', main.login);
  app.post('/login', main.loginPost);
	app.get('/signup', main.signup);
  app.post('/signup', main.signupPost);
  app.get('/logout', main.logout);

  //Páginas Restritas
  require('./restrict.js')(app);
  app.get('/migrateUsers/:ind', migration.migrateUsers);
  app.post('/migrateUsers/:ind', migration.migrateUsersPost);



}

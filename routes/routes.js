var main = require('./handlers/main.js'),
    migration = require('./handlers/migration.js'),
    actions = require('./handlers/actions.js'),
    restrict = require('./restrict.js');

module.exports = function(app){

  //Main routes
  app.get('/', main.about);
  app.get('/about', main.about);
  app.get('/login', main.login);
  app.post('/login', main.loginPost);
  app.get('/logout', main.logout);

  //Páginas Restritas
  restrict.simpleSession(app);
  app.get('/signup', main.signup);
  app.post('/signup', main.signupPost);

  //Páginas Restritas por nível de permissão 1
  restrict.redirectByPermission(app, 1);
  app.get('/migrateUsers/:ind', migration.migrateUsers);
  app.post('/migrateUsers/:ind', migration.migrateUsersPost);

}

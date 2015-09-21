var express = require('express');
var credentials = require('./config/credentials.js');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

/*
 * Conectando com mongoose
 */
var mongoose = require('mongoose');
var opts = {
			server: {
				socketOptions: { keepAlive: 1 }
			}
		};
switch(app.get('env')){
	case 'development':
		mongoose.connect(credentials.mongo.development.connectionString, opts);
	break;
	case 'production':
		mongoose.connect(credentials.mongo.production.connectionString, opts);
	break;
	default:
	  throw new Error('Unknown execution environment: ' + app.get('env'));
}

/*
 * Chamando arquivo de rotas Rotas
 */
require('./routes/routes.js')(app);

/*
 * 404 Erro de tudo o que não estiver previsto
 * na URL renderiza de /views/404.handlebars
 */
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Sistema de Patrimônio iniciado em http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});

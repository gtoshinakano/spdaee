var User = require('../../models/user');

/*
 * Script de Migração da tabela MySQL users para users SEM POST
 */
exports.migrateUsers = function(req,res){
	res.locals.getIndex = (parseInt(req.params.ind)) ? parseInt(req.params.ind): 0;
	res.render('migrateUsers');
}

/*
 * Script de Migração da tabela MySQL users para users COM POST
 */
exports.migrateUsersPost = function (req,res){
	var key = req.body.key;
	var migrateData = require('../../config/migrateUsersData.json');
	var nextKey = key;
	var migrateUser = migrateData[key];

	var query = User.findOne({ login: migrateUser.login });
	query.exec(function(err, user){
		if(err){
			req.session.error = err;
			return res.redirect(303, '/migrateUsers/' + nextKey);
		}
		/*
		 * CASO ENCONTRADO O USER, VERIFICAR NECESSIDADE DE UPDATE
		 */
		if(user){

			if(user.nome !== migrateUser.nome || user.cargo !== migrateUser.cargo || user.status !== migrateUser.status || user.local.diretoria !== migrateUser.local.diretoria || user.local.divisao !== migrateUser.local.divisao || user.local.secao !== migrateUser.local.secao || user.local.setor !== migrateUser.local.setor || user.local.servico !== migrateUser.local.servico){
				migrateUser.modifiedOn = new Date;
				User.update({ login: migrateUser.login }, {$set: migrateUser}, { multi: false }, function(err){
					if (err)
						req.session.error = "Erro ao tentar atualizar " + err;
					else{
						req.session.success = "Usuário " + migrateUser.nome + " salvo com sucesso";
						nextKey++;
					}
					return res.redirect(303, '/migrateUsers/' + nextKey);
				});

			}else{
				req.session.error = "Usuário encontrado. Dados iguais";
				nextKey++;
				return res.redirect(303, '/migrateUsers/' + nextKey);
			}

		}else{

			/*
			 * SALVANDO USER CASO NÃO ENCONTRADO
			 */
			req.session.success = "Usuário " + migrateUser.nome + " salvo com sucesso";
			new User(migrateUser).save();
			nextKey++;
			return res.redirect(303, '/migrateUsers/' + nextKey);
		}
	});
}

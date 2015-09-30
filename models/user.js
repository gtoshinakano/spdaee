// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
	login:  { type: String, unique: true },
	senha: String,
	prontuario: {type: Number, unique:true},
	nome:  {type: String, unique:true},
	local: {
		diretoria: String,
		divisao: String,
		servico: String,
		secao: String,
		setor: String
	},
	cargo: String,
	nivel: {type: Number, 'default': 0},
	status: {type: Number, 'default': 1},
	createdOn:  { type: Date, 'default': Date.now },
	modifiedOn: Date,
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

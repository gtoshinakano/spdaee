var mongoose = require('mongoose');

var patrimonioSchema = mongoose.Schema({
    id: String,
    chapa: Number,
    servidor: {
      name: String,
      diretoria: String
    },
    historico:{
      data: Date,
      servidor:{name: String,diretoria: String},
      evento: String
    }
});

patrimonioSchema.methods.getHistorico = function(){

  return this.historico;

};

var patrimonio = mongoose.model('Patrimonio', patrimonioSchema);
module.exports = patrimonio;

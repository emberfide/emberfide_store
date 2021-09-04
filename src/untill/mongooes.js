
module.exports = {
    mutipleMongooesToObject: function(mongooess) {
        return mongooess.map(mongooes =>  mongooes.toObject());
    },
    mongooesToObject: function(mongooes){
        return mongooes ? mongooes.toObject() : mongooes;
    }
}
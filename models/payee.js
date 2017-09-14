'use strict';
module.exports = function(sequelize, DataTypes) {
  var Payee = sequelize.define('Payee', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    OrderId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Payee.associate = (models) => {
    Payee.hasMany(models.Order)
    Payee.belongsToMany(models.Order, {through: 'OrderPayee'})
  };
  return Payee;
};
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Payee = sequelize.define('Payee', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  // Payee.associate = (models) => {
  //   Payee.belongsToMany(models.Order, {through: 'OrderPayee'})
  // };
  return Payee;
};
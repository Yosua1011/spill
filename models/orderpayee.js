'use strict';
module.exports = function(sequelize, DataTypes) {
  var OrderPayee = sequelize.define('OrderPayee', {
    OrderId: DataTypes.INTEGER,
    PayeeId: DataTypes.INTEGER,
    Total: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  OrderPayee.associate = (models) => {
    OrderPayee.belongsTo(models.Order)
    OrderPayee.belongsTo(models.Payee)
  }
  return OrderPayee;
};
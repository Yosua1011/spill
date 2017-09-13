'use strict';
module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    order: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Order.associate = (models) => {
    Order.hasMany(models.Payee)
    Order.belongsToMany(models.Payee, {through: 'OrderPayee'})
  };
  return Order;
};
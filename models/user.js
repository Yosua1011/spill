'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        isUnique: function(value, next) {
          User.find({
            where: {email: value},
            attributes: ['id']
          })
            .done(function(error,user) {
              if (error) 
                return next(error)
              if (user) 
                return next('Email address already in use!')
              next()
            })
        }
      }
    },
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
          isUnique: function(value, next) {
            Student.find({
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
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('User');
  }
};
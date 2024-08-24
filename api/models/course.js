'use strict';

const { Model, DataTypes } = require('sequelize');
const User = require('./user');

module.exports = (sequelize) => {
    class Course extends Model {}
    Course.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A course title must be provided in order to create/update a course.'
          },
          notEmpty: {
            msg: 'Please provide a course title'
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A course description must be provided in order to create/update a course.'
          },
          notEmpty: {
            msg: 'Please provide a course description'
          }
        }
      },
      estimatedTime: {
        type: DataTypes.STRING,
      },
      materialsNeeded: {
        type: DataTypes.STRING
      }
      ,
      userId: { 
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id',
        }
      },
    }, { sequelize });

    // Define Model Associations
    // In the Courses model, add a one-to-one association between the Course and User models using the belongsTo() method.
    Course.associate = (models) => {
      // Add Associations
      Course.belongsTo(models.User);
    }

    return Course;
};

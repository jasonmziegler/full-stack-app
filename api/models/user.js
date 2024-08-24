'use strict';

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    class User extends Model {}
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'An id is require to create a user record.'
                }
            }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A First Name is required to create a user record.'
                },
                notEmpty: {
                    msg: 'Please provide a first name.'
                }
            }
            
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A Last Name is required to create a user record.'
                },
                notEmpty: {
                    msg: 'Please provide a first name.'
                }
            }            
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A Email Address is required to create a user record.'
                },
                isEmail: {
                    msg: 'Please provide a valid email address.'
                }
            }          
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A Password is required to create a user record.'
                }
            },
            set(val) {
                const hashedPassword = bcrypt.hashSync(val, 10);
                this.setDataValue('password', hashedPassword);
            }       
        }
    }, { sequelize });

    // Define Model Associations
    // In the Users model, add a one-to-many association between the User and Course models using the hasMany() method.
    User.associate = (models) => {
        // Add Associations
        User.hasMany(models.Course);
    }


    return User;
};

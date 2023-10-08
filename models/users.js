var Sequelize = require('sequelize');
const sequelize = require('../controllers/helpers/dbconnect');

   const users = sequelize.define('users', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: Sequelize.STRING(100),
    last_name: Sequelize.STRING(100),
    email:Sequelize.STRING(120),
    password:Sequelize.STRING(255),
    created_at: Sequelize.DATEONLY,
    updated_at: Sequelize.DATEONLY
  
}, {
    freezeTableName: true,
    timestamps: false
});



module.exports = users;

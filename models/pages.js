var Sequelize = require('sequelize');
const sequelize = require('../controllers/helpers/dbconnect');

   const pages = sequelize.define('pages', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    title: Sequelize.STRING(255),
    slug: Sequelize.STRING(255),
    content:Sequelize.TEXT,
    created_at: Sequelize.DATEONLY,
    updated_at: Sequelize.DATEONLY
  
}, {
    freezeTableName: true,
    timestamps: false
});



module.exports = pages;

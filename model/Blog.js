const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model { };

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
}, {
  sequelize,
  underscored: true,
  freezeTableName: true,
  timestamps: true,
  modelName: 'blog',
});


module.exports = Blog;
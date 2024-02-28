const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { };

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  blog_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'blog',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }
}, {
  sequelize,
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  modelName: 'commment'
});

module.exports = Comment;
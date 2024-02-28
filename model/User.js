const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  async checkPW(pw) {
    return bcrypt.compare(pw, this.password);
  }
};

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  hooks: {
    async beforeCreate(userData) {
      console.log(userData);
      userData.password = await bcrypt.hash(userData.password, 10);
      return userData;
    },
    async beforeUpdate(userData) {
      userData.password = await bcrypt.hash(userData.password, 10);
      return userData;
    },
  },
  sequelize,
  timestamps: false,
  underscored: true,
  freezeTableName: true,
  modelName: 'user',
});


module.exports = User;
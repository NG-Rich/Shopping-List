'use strict';
module.exports = (sequelize, DataTypes) => {
  const Items = sequelize.define('Items', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    purchased: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Items.associate = function(models) {
    // associations can be defined here
    Items.belongsTo(models.List, {
      foreignKey: "listId",
      onDelete: "CASCADE"
    })
  };
  return Items;
};

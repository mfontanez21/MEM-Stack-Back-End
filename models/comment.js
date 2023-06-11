"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Profile, { foreignKey: "commenterId" });
      Comment.belongsTo(models.Profile, { foreignKey: "profileId" });
    }
  }
  Comment.init(
    {
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Profiles",
          key: "id",
        },
      },
      commenterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Profiles",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};

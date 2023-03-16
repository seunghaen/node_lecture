const Sequelize = require("sequelize");

class Hashtag extends Sequelize.Model {
  static initiate(sequelize) {
    Hashtag.init(
      { title: { type: Sequelize.STRING(15), allowNull: false, unique: true } },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: false,
        modelName: "Post",
        tableName: "posts",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  } //table 정보들 입력
  static associate(db) {} //table들간 관계 정보들 입력
}

module.exports = Hashtag;

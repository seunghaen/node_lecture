const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true, // 카카오 로그인에서는 null이 가능하다.
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: { type: Sequelize.STRING(100), allowNull: true },
        provider: {
          type: Sequelize.ENUM("local", "kakao"),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true, //createdAt,updatedAt
        underscored: false, //camel case로 변수명 만든다
        modelName: "User", //javascript에서 쓸 이름
        tableName: "users", //sql에서 쓸 이름
        paranoid: true, //deletedAt 이 생김 //데이터를 아예 지우지 않고 이 column에 값이 들어있는 row를 없는데이터로 치는 soft 삭제
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  } //table 정보들 입력
  static associate(db) {} //table들간 관계 정보들 입력
}

module.exports = User;

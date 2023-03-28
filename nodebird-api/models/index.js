const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;

const basename = path.basename(__filename); //index.js를 의미함
fs.readdirSync(__dirname) //지금 폴더에 있는 파일들 읽기
  .filter((file) => {
    return (
      file !== basename && file.indexOf(".") !== 0 && file.slice(-3) === ".js" //폴더에 있는 파일이 index.js가 아니고 숨긴파일이 아니고, js파일이라면,
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
    model.initiate(sequelize);
  });

Object.keys(db).forEach((filename) => {
  if (db[filename].associate) {
    db[filename].associate(db);
  }
}); //이렇게 따로 하는 이유는 initiate를 다하고나서 associate를 해야하기 때문에
module.exports = db;

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "socialMedia", // db name
  "root", // username
  "Root@123", // password 
  {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.error("Connection error:", err));

export default sequelize;

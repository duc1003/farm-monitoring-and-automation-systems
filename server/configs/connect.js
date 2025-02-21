import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "farm_monitoring_and_automation_system", // db name
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

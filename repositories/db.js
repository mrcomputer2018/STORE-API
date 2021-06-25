import Sequelize from "sequelize";

const sequelize = new Sequelize(
    "postgres://mgkwxtyu:TAKB4CEoG5--tuAxliHoM7wL0-Ja1ZW7@batyr.db.elephantsql.com/mgkwxtyu",
    {
        dialect: "postgres",
        define: {
            timestamps: false
        }
    }
);

export default sequelize;
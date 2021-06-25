import Sequelize from "sequelize";
import db from "../repositories/db.js";

//* Defimindo a classe
const Supplier = db.define('suppliers', {
    supplierId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        promaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { underscored : true });

//* Exportando classe
export default Supplier;
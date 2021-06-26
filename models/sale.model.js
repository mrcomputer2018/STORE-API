import Sequelize from "sequelize";
import db from "../repositories/db.js";
//* importando supplier para usar no belongsTo
import Client from "./client.model.js";
import Supplier from "./supplier.model.js";


//* Defimindo a classe
const Sale = db.define('sales', {
    saleId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    value: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, { underscored : true });

//* Criando a associacao para incluir o objeto de supplierID
//* belongsTo - ele pertence a alguem
Product.belongsTo(Client, { foreignKey: "clientId"});
Product.belongsTo(Supplier, { foreignKey: "supplierId"});

//* Exportando classe
export default Sale;
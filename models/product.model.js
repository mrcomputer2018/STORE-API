import Sequelize from "sequelize";
import db from "../repositories/db.js";
//* importando supplier para usar no belongsTo
import Supplier from "./supplier.model.js";

//* Defimindo a classe
const Product = db.define('products', {
    productId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        promaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    value: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, { underscored : true });

//* Criando a associacao para incluir o objeto de supplierID
//* belongsTo - ele pertence a alguem
Product.belongsTo(Supplier, { foreignKey: "supplierId"});

//* Exportando classe
export default Product;
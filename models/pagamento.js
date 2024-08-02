import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Pagamento = connection.define("pagamento", {
    
    dataPagamento: { 
        type: DataTypes.DATE,
        allowNull: false, 
        unique: true 
    },
    valor: { 
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true 
    },
    metodoPagamento: {
        type: DataTypes.STRING(130),
        allowNull: false
    }
});
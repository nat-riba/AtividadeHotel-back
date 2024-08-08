// imports clientes

import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";
import { Reserva } from "./reserva.js";
import { Pagamento } from "./pagamento.js";

export const Cliente = connection.define("cliente", {
    
    nome: { 
        type: DataTypes.STRING(130), 
        allowNull: false, 
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },
    telefone: { 
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true 
    },
});

Cliente.hasOne(Reserva, { onDelete: "CASCADE" });
Reserva.belongsTo(Cliente);

Cliente.hasOne(Pagamento, { onDelete: "CASCADE" });
Pagamento.belongsTo(Cliente)
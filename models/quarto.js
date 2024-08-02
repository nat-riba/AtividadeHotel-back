import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";
import { Cliente } from "./cliente.js";
import { Reserva } from "./reserva.js";

export const Quarto = connection.define("quarto", {
  numero: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, 
  },
  
  tipo: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },

  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
   },

  situacao: { // disponivel / reservado 
    type: DataTypes.STRING(30),
    allowNull: false
   }
});
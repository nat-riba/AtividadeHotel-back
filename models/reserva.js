import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";
import { Quarto } from "./quarto.js"
import { Pagamento } from "./pagamento.js"

// cliente_id, quarto_id, data_check_in, data_check_out, status
export const Reserva = connection.define("reserva", {
  data_check_in: { 
      type: DataTypes.DATE(),
      allowNull: false, 
  },
  data_check_out: { 
      type: DataTypes.DATE(),
      allowNull: false, 
  },
  status: { 
      type: DataTypes.STRING(11),
      allowNull: false,  
  },
});

Quarto.belongsTo(Reserva);
Pagamento.belongsTo(Reserva);
Reserva.hasOne(Pagamento, { onDelete: "CASCADE" })
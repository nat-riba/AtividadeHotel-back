import { Reserva } from "../models/reserva.js";
import { Cliente } from "../models/cliente.js";
import { Router } from "express";

export const reservasRouter = Router();

reservasRouter.get("/reservas", async (req, res) => {
  const listareservas = await Reserva.findAll();
  res.json(listareservas);
});

reservasRouter.get("/reservas/:id", async (req, res) => {
  const reserva = await Reserva.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [{ model: Cliente, attributes: ["id", ["nome", "nomeCliente"]] }],
  });

  if (reserva) {
    res.json(reserva);
  } else {
    res.status(404).json({ message: "reserva não encontrada." });
  }
});

reservasRouter.delete("/reservas/:id", async (req, res) => {
  try {
    const reserva = await Reserva.findByPk(req.params.id);
    if (reserva) {
      await reserva.destroy();
      res.json({ message: "reserva removida com sucesso" });
    } else {
      res.status(404).json({ message: "reserva não encontrada." });
    }
  } catch (err) {
    res.status(500).json({ message: "Ocorreu um erro ao excluir reserva" });
  }
});

reservasRouter.post("/reservas", async (req, res) => {
  const { data_check_in, data_check_out, status, clienteId } = req.body;

  try {
    const cliente = await Cliente.findByPk(clienteId);

    if (cliente) {
      await Reserva.create({ data_check_in, data_check_out, status, clienteId });
      res.json({ message: "reserva criada com sucesso." });
    } else {
      res
        .status(404)
        .json({ message: "Falha ao inserir reserva. Cliente não encontrado." });
    }
  } catch (err) {
    res.status(500).json({ message: "Ocorreu um erro ao tentar adicionar reserva." });
  }
});

// [PUT] /reservas/:id -> Atualizar um reserva
reservasRouter.put("/reservas/:id", async (req, res) => {
  const { data_check_in, data_check_out, status } = req.body;

  try {
    const reserva = await Reserva.findByPk(req.params.id);
    if (reserva) {
      await reserva.update({ data_check_in, data_check_out, status });
      res.json({ message: "reserva atualizada com sucesso." });
    } else {
      res.status(404).json({ message: "reserva não encontrada." });
    }
  } catch (err) {
    res.status(500).json({ message: "Um erro ocorreu ao tentar atualizar reserva." });
  }
});
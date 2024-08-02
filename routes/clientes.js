import { Cliente } from "../models/cliente.js";
import { Router } from "express";
import { Reserva } from "../models/reserva.js";
import { Quarto } from "../models/quarto.js";
import { Pagamento } from "../models/pagamento.js";

export const clientesRouter = Router();

clientesRouter.get("/clientes", async (req, res) => {

  const listaClientes = await Cliente.findAll();
  res.json(listaClientes);
});

clientesRouter.get("/clientes/:id", async (req, res) => {

  const cliente = await Cliente.findOne({
    where: { id: req.params.id },
    include: [Reserva],
  });

  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({ message: "Cliente não encontrado!" });
  }
});

clientesRouter.post("/clientes", async (req, res) => {

  const { nome, email, telefone } = req.body;

  try {

    await Cliente.create(
      { nome, email, telefone },
      { include: [Reserva] }
    );
    res.json({ message: "Cliente criado com sucesso." });
  } catch (err) {
  
    console.log(err);
    res.status(500).json({ message: "Um erro ocorreu ao inserir cliente." });
  }
});

clientesRouter.put("/clientes/:id", async (req, res) => {
  const idCliente = req.params.id;
  const { nome, email, telefone } = req.body;

  try {
    const cliente = await Cliente.findOne({ where: { id: idCliente } });

    if (cliente) {
      // Atualiza a linha do endereço que for o id do cliente
      // for igual ao id do cliente sendo atualizado.
      await cliente.update({ nome, email, telefone });
      res.json({ message: "Cliente atualizado." });
    } else {
      res.status(404).json({ message: "O cliente não encontrado." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Ocorreu um erro ao atualizar o cliente." });
  }
});

clientesRouter.delete("/clientes/:id", async (req, res) => {
  const idCliente = req.params.id;

  try {
    const cliente = await Cliente.findOne({ where: { id: idCliente } });

    if (cliente) {
      await cliente.destroy();
      res.json({ message: "Cliente removido com sucesso." });
    } else {
      res.status(404).json({ message: "Cliente não encontrado." });
    }
  } catch (err) {
    res.status(500).json({ message: "Um erro ocorreu ao excluir cliente" });
  }
});
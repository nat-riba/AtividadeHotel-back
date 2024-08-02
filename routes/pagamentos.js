import { Cliente } from "../models/cliente.js";
import { Router } from "express";
import { Reserva } from "../models/reserva.js";
import { Pagamento } from "../models/pagamento.js";
import { Quarto } from "../models/quarto.js";

export const pagamentosRouter = Router();

pagamentosRouter.get("/pagamentos", async (req, res) => {

  const listaPagamentos = await Pagamento.findAll();
  res.json(listaPagamentos);
});

pagamentosRouter.get("/pagamentos/:id", async (req, res) => {

  const pagamento = await Pagamento.findOne({
    where: { id: req.params.id },
    include: [Cliente, Reserva],
  });

  if (pagamento) {
    res.json(pagamento);
  } else {
    res.status(404).json({ message: "Pagamento pendente." });
  }
});

pagamentosRouter.post("/pagamentos", async (req, res) => {

  const { dataPagamento, valor, metodoPagamento } = req.body;

  try {

    await Pagamento.create(
      { dataPagamento, valor, metodoPagamento },
      { include: [Cliente] }
    );
    res.json({ message: "Pagamento efetuado com sucesso." });
  } catch (err) {
  
    console.log(err);
    res.status(500).json({ message: "Erro ao pagar quarto." });
  }
});

pagamentosRouter.put("/pagamentos/:id", async (req, res) => {
  const idPagamento = req.params.id;
  const { dataPagamento, valor, metodoPagamento } = req.body;

  try {
    const pagamento = await Pagamento.findOne({ where: { id: idPagamento } });

    if (pagamento) {
    
      await pagamento.update({ dataPagamento, valor, metodoPagamento });
      res.json({ message: "Pagamento atualizado." });
    } else {
      res.status(404).json({ message: "Pagamento não encontrado." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar pagamento." });
  }
});

pagamentosRouter.delete("/pagamentos/:id", async (req, res) => {
  const idPagamento = req.params.id;

  try {
    const pagamento = await Pagamento.findOne({ where: { id: idPagamento } });

    if (pagamento) {
      await pagamento.destroy();
      res.json({ message: "Pagamento removido com sucesso." });
    } else {
      res.status(404).json({ message: "Pagamento não encontrado." });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao excluir pagamento" });
  }
});
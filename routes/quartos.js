import { Router } from "express";
import { Reserva } from "../models/reserva.js";
import { Quarto } from "../models/quarto.js";

export const quartosRouter = Router();

quartosRouter.get("/quartos", async (req, res) => {

  const listaQuartos = await Quarto.findAll();
  res.json(listaQuartos);
});

quartosRouter.get("/quartos/:id", async (req, res) => {

  const quarto = await Quarto.findOne({
    where: { id: req.params.id },
    include: [Reserva],
  });

  if (quarto) {
    res.json(quarto);
  } else {
    res.status(404).json({ message: "Quarto não disponível." });
  }
});

quartosRouter.post("/quartos", async (req, res) => {

  const { numero, tipo, descricao, preco, situacao } = req.body;

  try {

    await Quarto.create(
      { numero, tipo, descricao, preco, situacao },
      { include: [Reserva] }
    );
    res.json({ message: "Quarto reservado com sucesso." });
  } catch (err) {
  
    console.log(err);
    res.status(500).json({ message: "Erro ao reservar quarto." });
  }
});

quartosRouter.put("/quartos/:id", async (req, res) => {
  const idQuarto = req.params.id;
  const { numero, tipo, descricao, preco, situacao } = req.body;

  try {
    const quarto = await Quarto.findOne({ where: { id: idQuarto } });

    if (quarto) {
    
      await quarto.update({ numero, tipo, descricao, preco, situacao  });
      res.json({ message: "Quarto atualizado." });
    } else {
      res.status(404).json({ message: "Quarto não encontrado." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar quarto." });
  }
});

quartosRouter.delete("/quartos/:id", async (req, res) => {
  const idQuarto = req.params.id;

  try {
    const quarto = await Quarto.findOne({ where: { id: idQuarto } });

    if (quarto) {
      await quarto.destroy();
      res.json({ message: "Quarto removido com sucesso." });
    } else {
      res.status(404).json({ message: "Quarto não encontrado." });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao excluir quarto" });
  }
});
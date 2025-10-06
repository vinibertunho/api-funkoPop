import dados from "../models/dados.js";
const { funkos } = dados;

const getAllFunkos = (req, res) => {
  const { franquia, raridade, condicao, edicaoEspecial } = req.query;
  let resultado = funkos;

  if (franquia) {
    resultado = resultado.filter((f) =>
      f.franquia.toLowerCase().includes(franquia.toLowerCase())
    );
  }
  if (raridade) {
    resultado = resultado.filter((r) =>
      r.raridade.toLowerCase().includes(raridade.toLowerCase())
    );
  }
  if (condicao) {
    resultado = resultado.filter(
      (c) => c.condicao.toLowerCase() === condicao.toLowerCase()
    );
  }
  if (edicaoEspecial) {
    resultado = resultado.filter(
      (es) => es.edicaoEspecial === (edicaoEspecial === "true")
    );
  }

  res.status(200).json({
    status: "200",
    success: true,
    mensagem: "Lista de Funkos Pop! retornada com sucesso",
    data: resultado,
    total: resultado.length,
  });
};

const getById = (req, res) => {
  const id = parseInt(req.params.id);
  const funkoEncontrado = funkos.find((f) => f.id === id);
  if (!funkoEncontrado) {
    return res.status(404).json({
      status: "404",
      success: false,
      mensagem: "Funko Pop! não encontrado",
      data: null,
    });
  } else {
    return res.status(200).json({
      status: "200",
      success: true,
      mensagem: "Funko Pop! encontrado com sucesso",
      data: funkoEncontrado,
    });
  }
};

const createFunko = (req, res) => {
  const novoFunko = req.body;

  if (!novoFunko.numero || novoFunko.numero <= 0) {
    return res.status(400).json({
      status: "400",
      success: false,
      mensagem: "O número do Funko deve ser maior que 0",
      data: null,
    });
  }

  const condicoesValidas = ["Mint", "Boa", "Regular", "Danificada"];
  if (!condicoesValidas.includes(novoFunko.condicao)) {
    return res.status(400).json({
      status: "400",
      success: false,
      mensagem: "Condição inválida. Use: Mint, Boa, Regular ou Danificada",
      data: null,
    });
  }
  const newFunko = {
    id: funkos.length + 1,
    personagem: req.body.personagem,
    franquia: req.body.franquia,
    numero: req.body.numero,
    raridade: req.body.raridade,
    condicao: req.body.condicao,
    preco: req.body.preco,
    dataAquisicao: req.body.dataAquisicao,
    edicaoEspecial: req.body.edicaoEspecial || false,
  };
  funkos.push(novoFunko);
  return res.status(201).json({
    status: "201",
    success: true,
    mensagem: "Novo Funko Pop! adicionado com sucesso",
    data: novoFunko,
  });
};

d

export { getAllFunkos, getById, createFunko };

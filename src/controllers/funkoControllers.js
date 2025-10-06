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
    timestamp: new Date(),
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
      timestamp: new Date(),
    });
  } else {
    return res.status(200).json({
      status: "200",
      success: true,
      mensagem: "Funko Pop! encontrado com sucesso",
      data: funkoEncontrado,
      timestamp: new Date(),
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
    dataAquisicao: new Date(),
    edicaoEspecial: req.body.edicaoEspecial || false,
  };
  funkos.push(newFunko);
  return res.status(201).json({
    status: "201",
    success: true,
    mensagem: "Novo Funko Pop! adicionado com sucesso",
    data: newFunko,
    timestamp: new Date(),
  });
};

const deleteFunko = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      status: "400",
      success: false,
      mensagem: "ID inválido. Deve ser um número.",
      data: null,
      timestamp: new Date(),
    });
  }
  const funkoParaDeletar = funkos.find((f) => f.id === id);
  if (!funkoParaDeletar) {
    return res.status(404).json({
      status: "404",
      success: false,
      mensagem: "Funko Pop! não encontrado",
      data: null,
      timestamp: new Date(),
    });
  }
  const funkoFiltrado = funkos.filter((f) => f.id !== id);

  funkos.splice(0, funkos.length, ...funkoFiltrado);
  return res.status(200).json({
    status: "200",
    success: true,
    mensagem: "Funko Pop! deletado com sucesso",
    data: funkoParaDeletar,
    timestamp: new Date(),
  });
};

const updateFunkos = (req, res) => {
  const { id } = req.params;
  const {
    personagem,
    franquia,
    numero,
    raridade,
    condicao,
    preco,
    dataAquisicao,
    edicaoEspecial,
  } = req.body;

  const raridadesOficiais = ["Comum", "Exclusivo", "Chase", "Raro"];
  const condicoesValidas = ["Mint", "Boa", "Regular", "Danificada"];

  // valida ID
  if (isNaN(id)) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "ID inválido. O ID deve ser um número.",
      error: "INVALID_ID",
      timestamp: new Date(),
    });
  }

  const idParaEditar = parseInt(id);
  const funkoExistente = funkos.find((f) => f.id === idParaEditar);

  if (!funkoExistente) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: "Funko com ID não encontrado",
      error: "FUNKO_NOT_FOUND",
      suggestions: [
        "Verifique se o Funko está registrado",
        "Cheque se o ID informado está correto",
      ],
      timestamp: new Date(),
    });
  }

  if (numero && numero <= 0) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "O número do Funko deve ser maior que 0",
      error: "INVALID_NUMBER",
      timestamp: new Date(),
    });
  }

  if (raridade && !raridadesOficiais.includes(raridade)) {
    return res.status(400).json({
      status: 400,
      success: false,
      message:
        "Raridade inválida. Valores permitidos: Comum, Exclusivo, Chase ou Raro.",
      error: "INVALID_RARITY",
      timestamp: new Date(),
    });
  }

  if (condicao && !condicoesValidas.includes(condicao)) {
    return res.status(400).json({
      status: 400,
      success: false,
      message:
        "Condição inválida. Valores permitidos: Mint, Boa, Regular ou Danificada.",
      error: "INVALID_CONDITION",
      timestamp: new Date(),
    });
  }

  const funkosAtualizados = funkos.map((funko) =>
    funko.id === idParaEditar
      ? {
          ...funko,
          ...(personagem && { personagem }),
          ...(franquia && { franquia }),
          ...(numero && { numero }),
          ...(raridade && { raridade }),
          ...(condicao && { condicao }),
          ...(preco && { preco }),
          ...(dataAquisicao &&
            new Date(dataAquisicao) >= new Date() && { dataAquisicao }),
          ...(edicaoEspecial !== undefined && { edicaoEspecial }),
        }
      : funko
  );

  funkos.splice(0, funkos.length, ...funkosAtualizados);

  const funkoAtualizado = funkos.find((f) => f.id === idParaEditar);

  return res.status(200).json({
    status: 200,
    success: true,
    message: "Funko atualizado com sucesso",
    data: funkoAtualizado,
    timestamp: new Date(),
  });
};

export { getAllFunkos, getById, createFunko, deleteFunko, updateFunkos };
